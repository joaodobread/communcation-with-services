import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    @Inject('ORGANIZATION')
    private readonly organizationClientProxy: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const organizationProxy = await lastValueFrom(
      this.organizationClientProxy.send(
        {
          cmd: 'findByLocation',
        },
        { location: createUserDto.location },
      ),
    );

    if (!organizationProxy)
      throw new NotFoundException('exception:ORGANIZATION_NOT_FOUND');

    const user = this.userRepository.create();
    Object.assign(user, createUserDto);
    user.organization = organizationProxy.id;

    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.softDelete(user);
  }
}

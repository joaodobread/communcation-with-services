import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Environment } from '../config/environment';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    ClientsModule.register([
      {
        name: 'ORGANIZATION',
        transport: Transport.REDIS,
        options: {
          url: Environment.redisUrl,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

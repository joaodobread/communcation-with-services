import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/organization.entity';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {}

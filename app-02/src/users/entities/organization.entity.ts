import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', type: String, nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: String, nullable: false })
  password: string;

  @Column({ name: 'name', type: String, nullable: false })
  name: string;

  @Column({ name: 'organization', type: Number, nullable: false })
  organization: number;

  @DeleteDateColumn()
  deleted_at: Date;
}

import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'organizations' })
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: String, nullable: false, unique: true })
  name: string;

  @Column({ name: 'location', type: String, nullable: false })
  location: string;

  @DeleteDateColumn()
  deleted_at: Date;
}

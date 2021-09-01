import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsRepository } from './repositories/organization.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationsRepository])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}

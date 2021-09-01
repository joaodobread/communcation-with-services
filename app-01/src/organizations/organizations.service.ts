import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { GetOrganizationByLocation } from './dto/get-organization-by-location.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsRepository } from './repositories/organization.repository';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationsRepository)
    private organizationRepository: OrganizationsRepository,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizationRepository.create();
    Object.assign(organization, createOrganizationDto);
    await this.organizationRepository.save(organization);
    return organization;
  }

  async findAll() {
    return await this.organizationRepository.find({});
  }

  async findOne(id: number) {
    const organization = await this.organizationRepository.findOne({ id });
    if (!organization) throw new NotFoundException();
    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.findOne(id);
    this.organizationRepository.merge(organization, updateOrganizationDto);
    await this.organizationRepository.save(organization);
    return organization;
  }

  async remove(id: number) {
    const organization = await this.findOne(id);
    await this.organizationRepository.softDelete(organization);
  }

  async findByLocation(payload: GetOrganizationByLocation) {
    const { location } = payload;
    const organization = await this.organizationRepository.findOne({
      location,
    });
    return organization;
  }
}

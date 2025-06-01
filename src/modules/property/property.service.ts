import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PropertyEntity } from './property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyMapper } from './property.mapper';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);

  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  async findByProducerId(producerId: string): Promise<PropertyEntity[]> {
    return this.propertyRepository.findBy({ producerId });
  }

  async findById(id: string): Promise<PropertyEntity> {
    const property = await this.propertyRepository.findOneBy({ id });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  private validateAreas(total: number, farmable: number, vegetation: number) {
    if (farmable + vegetation > total) {
      throw new Error('The sum of farmableArea and vegetationArea cannot exceed totalArea');
    }
  }

  async createProperty(dto: CreatePropertyDto): Promise<PropertyEntity> {
    this.validateAreas(dto.totalArea, dto.farmableArea, dto.vegetationArea);
    const entity = PropertyMapper.fromCreateDtoToEntity(dto);
    const saved = await this.propertyRepository.save(entity);
    this.logger.log(`Property created: ${saved.id} for producer ${dto.producerId}`);
    return saved;
  }

  async softDelete(id: string): Promise<UpdateResult> {
    const property = await this.findById(id);
    this.logger.log(`Property soft deleted: ${property.id}`);
    return this.propertyRepository.softDelete(property.id);
  }

  async update({ id, dto }: { id: string; dto: UpdatePropertyDto }): Promise<PropertyEntity> {
    this.validateAreas(dto.totalArea, dto.farmableArea, dto.vegetationArea);
    const property = await this.findById(id);
    Object.assign(property, dto);
    const updated = await this.propertyRepository.save(property);
    this.logger.log(`Property updated: ${updated.id}`);
    return updated;
  }
}

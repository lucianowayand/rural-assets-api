import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeasonHarvestEntity } from './season-harvest.entity';
import { CreateSeasonHarvestDto } from './dto/create-season-harvest.dto';
import { UpdateSeasonHarvestDto } from './dto/update-season-harvest.dto';
import { SeasonHarvestMapper } from './season-harvest.mapper';
import { PropertyService } from '../../property/property.service';

@Injectable()
export class SeasonHarvestService {
  private readonly logger = new Logger(SeasonHarvestService.name);

  constructor(
    @InjectRepository(SeasonHarvestEntity)
    private readonly seasonHarvestRepository: Repository<SeasonHarvestEntity>,
    private readonly propertyService: PropertyService,
  ) {}

  private async validateTotalPlantedArea(propertyId: string, areaToAdd: number, excludeHarvestId?: string) {
    const property = await this.propertyService.findById(propertyId);
    const allHarvests = await this.seasonHarvestRepository.findBy({ propertyId });

    const filteredHarvests = excludeHarvestId
      ? allHarvests.filter(h => h.id !== excludeHarvestId)
      : allHarvests;

    const totalPlantedArea = filteredHarvests.reduce((sum, h) => sum + h.area, 0) + areaToAdd;
    
    if (totalPlantedArea > property.farmableArea) {
      throw new BadRequestException('Total planted area for this property in all seasons cannot exceed property farmable area');
    }
  }

  async createSeasonHarvest(dto: CreateSeasonHarvestDto): Promise<SeasonHarvestEntity> {
    await this.validateTotalPlantedArea(dto.propertyId, dto.area);
    const entity = SeasonHarvestMapper.fromCreateDtoToEntity(dto);
    return this.seasonHarvestRepository.save(entity);
  }

  async updateSeasonHarvest(id: string, dto: UpdateSeasonHarvestDto): Promise<SeasonHarvestEntity> {
    const seasonHarvest = await this.seasonHarvestRepository.findOneBy({ id });
    if (!seasonHarvest) throw new NotFoundException('Season harvest not found');
    if (dto.propertyId || dto.area) {
      const propertyId = dto.propertyId || seasonHarvest.propertyId;
      const area = dto.area !== undefined ? dto.area : seasonHarvest.area;
      await this.validateTotalPlantedArea(propertyId, area, id);
    }
    Object.assign(seasonHarvest, dto);
    this.logger.log(`Season harvest updated: ${seasonHarvest.id}`);
    return this.seasonHarvestRepository.save(seasonHarvest);
  }

  async findSeasonHarvestById(id: string): Promise<SeasonHarvestEntity> {
    const seasonHarvest = await this.seasonHarvestRepository.findOneBy({ id });
    if (!seasonHarvest) throw new NotFoundException('Season harvest not found');
    return seasonHarvest;
  }

  async findAllSeasonHarvests(): Promise<SeasonHarvestEntity[]> {
    return this.seasonHarvestRepository.find();
  }

  async findHarvestsByProperty(propertyId: string): Promise<SeasonHarvestEntity[]> {
    return this.seasonHarvestRepository.findBy({ propertyId });
  }

  async deleteSeasonHarvest(id: string): Promise<void> {
    const seasonHarvest = await this.seasonHarvestRepository.findOneBy({ id });
    if (!seasonHarvest) throw new NotFoundException('Season harvest not found');
    await this.seasonHarvestRepository.delete(id);
    this.logger.log(`Season harvest deleted: ${id}`);
  }
}

import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeasonEntity } from './season.entity';
import { SeasonMapper } from './season.mapper';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Injectable()
export class SeasonService {
  private readonly logger = new Logger(SeasonService.name);

  constructor(
    @InjectRepository(SeasonEntity)
    private readonly seasonRepository: Repository<SeasonEntity>,
  ) {}

  async createSeason(dto: CreateSeasonDto): Promise<SeasonEntity> {
    const entity = SeasonMapper.fromCreateDtoToEntity(dto);
    return this.seasonRepository.save(entity);
  }

  async updateSeason(id: string, dto: UpdateSeasonDto): Promise<SeasonEntity> {
    const season = await this.seasonRepository.findOneBy({ id });
    if (!season) throw new NotFoundException('Season not found');
    Object.assign(season, dto);
    this.logger.log(`Season updated: ${season.id}`);
    return this.seasonRepository.save(season);
  }

  async findSeasonById(id: string): Promise<SeasonEntity> {
    const season = await this.seasonRepository.findOneBy({ id });
    if (!season) throw new NotFoundException('Season not found');
    return season;
  }

  async findAllSeasons(): Promise<SeasonEntity[]> {
    return this.seasonRepository.find();
  }

  async deleteSeason(id: string): Promise<void> {
    const season = await this.seasonRepository.findOneBy({ id });
    if (!season) throw new NotFoundException('Season not found');
    await this.seasonRepository.softDelete(id);
    this.logger.log(`Season deleted: ${id}`);
  }

}

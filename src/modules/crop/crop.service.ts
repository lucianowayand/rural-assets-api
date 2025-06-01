import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropEntity } from './crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { CropMapper } from './crop.mapper';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropService {
  private readonly logger = new Logger(CropService.name);

  constructor(
    @InjectRepository(CropEntity)
    private readonly cropRepository: Repository<CropEntity>,
  ) {}

  async findAll(): Promise<CropEntity[]> {
    return this.cropRepository.find();
  }

  async findById(id: string): Promise<CropEntity> {
    const crop = await this.cropRepository.findOneBy({ id });
    if (!crop) {
      throw new NotFoundException('Crop not found');
    }
    return crop;
  }

  async createCrop(dto: CreateCropDto): Promise<CropEntity> {
    const entity = CropMapper.fromCreateDtoToEntity(dto);
    const saved = await this.cropRepository.save(entity);
    this.logger.log(`Crop created: ${saved.id}`);
    return saved;
  }

  async softDelete(id: string) {
    const crop = await this.findById(id);
    this.logger.log(`Crop soft deleted: ${crop.id}`);
    return this.cropRepository.softDelete(crop.id);
  }

  async update({ id, dto }: { id: string; dto: UpdateCropDto }): Promise<CropEntity> {
    const crop = await this.findById(id);
    Object.assign(crop, dto);
    this.logger.log(`Crop updated: ${crop.id}`);
    return this.cropRepository.save(crop);
  }
}

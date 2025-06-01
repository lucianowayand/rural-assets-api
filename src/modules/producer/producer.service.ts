import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ProducerEntity } from './producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { ProducerMapper } from './producer.mapper';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerDto } from './dto/producer.dto';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name);

  constructor(
    @InjectRepository(ProducerEntity)
    private readonly producerRepository: Repository<ProducerEntity>,
  ) {}

  async findByUserId(userId: string): Promise<ProducerEntity[]> {
    return this.producerRepository.findBy({ userId });
  }

  async findById({ id, userId }: { id: string; userId: string }): Promise<ProducerEntity> {
    const producer = await this.producerRepository.findOneBy({ id });
    if (!producer) {
      throw new NotFoundException('Producer not found');
    }
    if (producer.userId !== userId) {
      throw new ForbiddenException('Producer does not belong to the user');
    }
    return producer;
  }

  async createProducer({
    dto,
    userId,
  }: {
    dto: CreateProducerDto;
    userId: string;
  }): Promise<ProducerEntity> {
    const entity = ProducerMapper.fromCreateDtoToEntity(dto, userId);
    const saved = await this.producerRepository.save(entity);
    this.logger.log(`Producer created: ${saved.id} by user ${userId}`);
    return saved;
  }

  async softDelete({ id, userId }: { id: string; userId: string }): Promise<UpdateResult> {
    const producer = await this.findById({ id, userId });
    this.logger.log(`Producer soft deleted: ${producer.id} by user ${userId}`);
    return this.producerRepository.softDelete(producer.id);
  }

  async update({
    id,
    userId,
    dto,
  }: {
    id: string;
    userId: string;
    dto: UpdateProducerDto;
  }): Promise<ProducerEntity> {
    const producer = await this.findById({ id, userId });
    producer.name = dto.name;
    const updated = await this.producerRepository.save(producer);
    this.logger.log(`Producer updated: ${updated.id} by user ${userId}`);
    return updated;
  }
}

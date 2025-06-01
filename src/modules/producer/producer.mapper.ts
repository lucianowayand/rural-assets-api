import { ProducerEntity } from './producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { ProducerDto } from './dto/producer.dto';

export class ProducerMapper {
  static fromCreateDtoToEntity(dto: CreateProducerDto, userId: string): ProducerEntity {
    const entity = new ProducerEntity();
    entity.governmentIssuedId = dto.governmentIssuedId;
    entity.name = dto.name;
    entity.userId = userId;
    return entity;
  }

  static fromEntityToDto(entity: ProducerEntity): ProducerDto {
    const dto = new ProducerDto();
    dto.id = entity.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.deletedAt = entity.deletedAt;
    dto.governmentIssuedId = entity.governmentIssuedId;
    dto.name = entity.name;
    dto.userId = entity.userId;
    return dto;
  }
}

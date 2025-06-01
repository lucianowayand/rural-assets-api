import { CreateSeasonDto } from './dto/create-season.dto';
import { SeasonDto } from './dto/season.dto';
import { SeasonEntity } from './season.entity';

export class SeasonMapper {
  static fromCreateDtoToEntity(dto: CreateSeasonDto): SeasonEntity {
    const entity = new SeasonEntity();
    entity.referenceYear = dto.referenceYear;
    return entity;
  }

  static fromEntityToDto(entity: SeasonEntity): SeasonDto {
    const dto = new SeasonDto();
    dto.id = entity.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.deletedAt = entity.deletedAt;
    dto.referenceYear = entity.referenceYear;
    return dto;
  }
}

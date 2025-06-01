import { CreateSeasonHarvestDto } from './dto/create-season-harvest.dto';
import { SeasonHarvestDto } from './dto/season-harvest.dto';
import { SeasonHarvestEntity } from './season-harvest.entity';

export class SeasonHarvestMapper {
  static fromCreateDtoToEntity(dto: CreateSeasonHarvestDto): SeasonHarvestEntity {
    const entity = new SeasonHarvestEntity();
    entity.propertyId = dto.propertyId;
    entity.cropId = dto.cropId;
    entity.seasonId = dto.seasonId;
    entity.area = dto.area;
    return entity;
  }

  static fromEntityToDto(entity: SeasonHarvestEntity): SeasonHarvestDto {
    const dto = new SeasonHarvestDto();
    dto.id = entity.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.deletedAt = entity.deletedAt;
    dto.propertyId = entity.propertyId;
    dto.cropId = entity.cropId;
    dto.seasonId = entity.seasonId;
    dto.area = entity.area;
    return dto;
  }
}

import { PropertyEntity } from './property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyDto } from './dto/property.dto';

export class PropertyMapper {
  static fromCreateDtoToEntity(dto: CreatePropertyDto): PropertyEntity {
    const entity = new PropertyEntity();
    entity.name = dto.name;
    entity.city = dto.city;
    entity.stateShortName = dto.stateShortName;
    entity.totalArea = dto.totalArea;
    entity.farmableArea = dto.farmableArea;
    entity.vegetationArea = dto.vegetationArea;
    entity.producerId = dto.producerId;
    return entity;
  }

  static fromEntityToDto(entity: PropertyEntity): PropertyDto {
    const dto = new PropertyDto();
    dto.id = entity.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.deletedAt = entity.deletedAt;
    dto.name = entity.name;
    dto.city = entity.city;
    dto.stateShortName = entity.stateShortName;
    dto.totalArea = entity.totalArea;
    dto.farmableArea = entity.farmableArea;
    dto.vegetationArea = entity.vegetationArea;
    dto.producerId = entity.producerId;
    return dto;
  }
}

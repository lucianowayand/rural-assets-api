import { CropEntity } from './crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { CropDto } from './dto/crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

export class CropMapper {
  static fromCreateDtoToEntity(dto: CreateCropDto): CropEntity {
    const entity = new CropEntity();
    entity.name = dto.name;
    return entity;
  }

  static fromEntityToDto(entity: CropEntity): CropDto {
    const dto = new CropDto();
    dto.id = entity.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.deletedAt = entity.deletedAt;
    dto.name = entity.name;
    return dto;
  }
}

import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

export class UserMapper {
  static fromEntityToDto(entity: UserEntity): UserDto {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.role = entity.role;

    return dto;
  }
}

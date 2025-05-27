import { BaseDto } from 'src/core/baseDto';
import { USER_ROLE } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends BaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: USER_ROLE;
}

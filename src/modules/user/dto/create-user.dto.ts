import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, IsUUID } from 'class-validator';
import { BaseDto } from 'src/core/baseDto';

export class CreateUserDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8 })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

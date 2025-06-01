import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropDto {
  @ApiProperty({ example: 'Soybean', description: 'Name of the crop' })
  @IsNotEmpty()
  @IsString()
  name: string;
}

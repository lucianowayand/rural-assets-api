import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/core/baseDto';

export class CropDto extends BaseDto {
  @ApiProperty({ example: 'Soybean', description: 'Name of the crop' })
  name: string;
}

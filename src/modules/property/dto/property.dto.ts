import { BaseDto } from 'src/core/baseDto';
import { ApiProperty } from '@nestjs/swagger';

export class PropertyDto extends BaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  stateShortName: string;

  @ApiProperty()
  totalArea: number;

  @ApiProperty()
  farmableArea: number;

  @ApiProperty()
  vegetationArea: number;

  @ApiProperty()
  producerId: string;
}

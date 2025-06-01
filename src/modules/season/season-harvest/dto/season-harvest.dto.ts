import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../../core/baseDto';

export class SeasonHarvestDto extends BaseDto {
  @ApiProperty({ description: 'Property ID' })
  propertyId: string;

  @ApiProperty({ description: 'Crop ID' })
  cropId: string;

  @ApiProperty({ description: 'Season ID' })
  seasonId: string;

  @ApiProperty({ description: 'Area planted' })
  area: number;
}

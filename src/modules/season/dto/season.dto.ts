import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/core/baseDto';

export class SeasonDto extends BaseDto {
  @ApiProperty({ example: 2025, description: 'Reference year for the season' })
  referenceYear: number;
}

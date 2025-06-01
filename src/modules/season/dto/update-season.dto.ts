import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSeasonDto {
  @ApiPropertyOptional({ example: 2025, description: 'Reference year for the season' })
  @IsOptional()
  @IsInt()
  referenceYear?: number;
}

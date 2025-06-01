import { IsOptional, IsUUID, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSeasonHarvestDto {
  @ApiPropertyOptional({ description: 'Property ID', example: 'uuid-property' })
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiPropertyOptional({ description: 'Crop ID', example: 'uuid-crop' })
  @IsOptional()
  @IsUUID()
  cropId?: string;

  @ApiPropertyOptional({ description: 'Season ID', example: 'uuid-season' })
  @IsOptional()
  @IsUUID()
  seasonId?: string;

  @ApiPropertyOptional({ description: 'Area planted (must not exceed property farmable area)', example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  area?: number;
}

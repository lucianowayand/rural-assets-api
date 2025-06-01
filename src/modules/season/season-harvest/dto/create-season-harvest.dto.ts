import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeasonHarvestDto {
  @ApiProperty({ description: 'Property ID', example: 'uuid-property' })
  @IsNotEmpty()
  @IsUUID()
  propertyId: string;

  @ApiProperty({ description: 'Crop ID', example: 'uuid-crop' })
  @IsNotEmpty()
  @IsUUID()
  cropId: string;

  @ApiProperty({ description: 'Season ID', example: 'uuid-season' })
  @IsNotEmpty()
  @IsUUID()
  seasonId: string;

  @ApiProperty({ description: 'Area planted (must not exceed property farmable area)', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  area: number;
}

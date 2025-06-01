import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeasonDto {
  @ApiProperty({ example: 2025, description: 'Reference year for the season' })
  @IsNotEmpty()
  @IsInt()
  referenceYear: number;
}

import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCropDto {
  @ApiPropertyOptional({ example: 'Soybean', description: 'Name of the crop' })
  @IsOptional()
  @IsString()
  name?: string;
}

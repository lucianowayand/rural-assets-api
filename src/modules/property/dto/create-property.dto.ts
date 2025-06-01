import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { IsAreaSumValid } from './is-area-sum-valid.decorator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  stateShortName: string;

  @IsNotEmpty()
  @IsNumber()
  totalArea: number;

  @IsNotEmpty()
  @IsNumber()
  farmableArea: number;

  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;

  @IsNotEmpty()
  @IsString()
  producerId: string;
}

IsAreaSumValid({ message: 'The sum of farmableArea and vegetationArea cannot exceed totalArea' })(CreatePropertyDto.prototype, 'totalArea');

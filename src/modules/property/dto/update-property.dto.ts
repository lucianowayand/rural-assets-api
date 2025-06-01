import { CreatePropertyDto } from './create-property.dto';
import { OmitType } from '@nestjs/swagger';
import { IsAreaSumValid } from './is-area-sum-valid.decorator';

export class UpdatePropertyDto extends OmitType(CreatePropertyDto, ['producerId'] as const) {}

IsAreaSumValid({ message: 'The sum of farmableArea and vegetationArea cannot exceed totalArea' })(UpdatePropertyDto.prototype, 'totalArea');

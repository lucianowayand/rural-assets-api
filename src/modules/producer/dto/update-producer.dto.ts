import { CreateProducerDto } from './create-producer.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateProducerDto extends OmitType(CreateProducerDto, [
  'governmentIssuedId',
] as const) {}

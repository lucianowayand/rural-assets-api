import { BaseDto } from 'src/core/baseDto';
import { ApiProperty } from '@nestjs/swagger';

export class ProducerDto extends BaseDto {
  @ApiProperty()
  governmentIssuedId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;
}

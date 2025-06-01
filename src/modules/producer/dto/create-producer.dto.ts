import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProducerDto {
  @IsNotEmpty()
  @IsString()
  @Length(11, 14)
  governmentIssuedId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

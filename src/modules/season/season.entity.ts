import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/core/baseEntity';

@Entity('seasons')
export class SeasonEntity extends BaseEntity {
  @Column('int', { name: 'reference_year', nullable: false })
  referenceYear: number;
}

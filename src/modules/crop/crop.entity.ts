import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/core/baseEntity';

@Entity('crops')
export class CropEntity extends BaseEntity {
  @Column('character varying', { name: 'name', nullable: false })
  name: string;
}

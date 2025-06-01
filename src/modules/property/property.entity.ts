import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/core/baseEntity';
import { ProducerEntity } from '../producer/producer.entity';

@Entity('properties')
export class PropertyEntity extends BaseEntity {
  @Column('character varying', { name: 'name', nullable: false })
  name: string;

  @Column('character varying', { name: 'city', nullable: false })
  city: string;

  @Column('character varying', { name: 'state_short_name', nullable: false })
  stateShortName: string;

  @Column('float', { name: 'total_area', nullable: false })
  totalArea: number;

  @Column('float', { name: 'farmable_area', nullable: false })
  farmableArea: number;

  @Column('float', { name: 'vegetation_area', nullable: false })
  vegetationArea: number;

  @ManyToOne(() => ProducerEntity)
  @JoinColumn({ name: 'producer_id' })
  producer: ProducerEntity;

  @Column('uuid', { name: 'producer_id', nullable: false })
  producerId: string;
}

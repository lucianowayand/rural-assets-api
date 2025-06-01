import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../core/baseEntity';
import { PropertyEntity } from '../../property/property.entity';
import { CropEntity } from '../../crop/crop.entity';
import { SeasonEntity } from '../season.entity';

@Entity('season_harvests')
export class SeasonHarvestEntity extends BaseEntity {
  @ManyToOne(() => PropertyEntity)
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @Column('uuid', { name: 'property_id', nullable: false })
  propertyId: string;

  @ManyToOne(() => CropEntity)
  @JoinColumn({ name: 'crop_id' })
  crop: CropEntity;

  @Column('uuid', { name: 'crop_id', nullable: false })
  cropId: string;

  @ManyToOne(() => SeasonEntity)
  @JoinColumn({ name: 'season_id' })
  season: SeasonEntity;

  @Column('uuid', { name: 'season_id', nullable: false })
  seasonId: string;

  @Column('float', { name: 'area', nullable: false })
  area: number;
}

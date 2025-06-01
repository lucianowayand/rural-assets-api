import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/core/baseEntity';
import { UserEntity } from 'src/modules/user/user.entity';

@Entity('producers')
export class ProducerEntity extends BaseEntity {
  @Column('character varying', { name: 'government_issued_id', nullable: false })
  governmentIssuedId: string;

  @Column('character varying', { name: 'name', nullable: false })
  name: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('uuid', { name: 'user_id', nullable: false })
  userId: string;
}

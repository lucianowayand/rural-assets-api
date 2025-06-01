import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/baseEntity';
import { ProducerEntity } from 'src/modules/producer/producer.entity';

export enum USER_ROLE {
  STAFF = 'STAFF',
  USER = 'USER',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('character varying', { nullable: false })
  name: string;

  @Column('character varying', { nullable: false })
  email: string;

  @Column('character varying', { nullable: false })
  password: string;

  @Column('enum', { enum: USER_ROLE, default: USER_ROLE.USER })
  role: USER_ROLE;

  @OneToMany(() => ProducerEntity, (producer) => producer.user)
  producers: ProducerEntity[];
}

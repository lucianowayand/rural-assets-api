import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity]), UserModule],
  providers: [PropertyService],
  controllers: [PropertyController],
  exports: [TypeOrmModule, PropertyService],
})
export class PropertyModule {}

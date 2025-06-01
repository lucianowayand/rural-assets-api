import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropEntity } from './crop.entity';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CropEntity]), UserModule],
  providers: [CropService],
  controllers: [CropController],
  exports: [TypeOrmModule],
})
export class CropModule {}

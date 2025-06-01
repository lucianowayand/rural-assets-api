import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonEntity } from './season.entity';
import { PropertyModule } from '../property/property.module';
import { CropModule } from '../crop/crop.module';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';
import { SeasonHarvestController } from './season-harvest/season-harvest.controller';
import { SeasonHarvestEntity } from './season-harvest/season-harvest.entity';
import { UserModule } from '../user/user.module';
import { SeasonHarvestService } from './season-harvest/season-harvest.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeasonEntity, SeasonHarvestEntity]),
    UserModule,
    PropertyModule,
    CropModule,
  ],
  providers: [SeasonService, SeasonHarvestService],
  controllers: [SeasonController, SeasonHarvestController],
  exports: [TypeOrmModule],
})
export class SeasonModule {}

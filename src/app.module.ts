import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './db/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ProducerModule } from './modules/producer/producer.module';
import { PropertyModule } from './modules/property/property.module';
import { CropModule } from './modules/crop/crop.module';
import { SeasonModule } from './modules/season/season.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    ProducerModule,
    PropertyModule,
    CropModule,
    SeasonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

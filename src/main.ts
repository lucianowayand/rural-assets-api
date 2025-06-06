import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { existsSync, writeFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  if (!existsSync('dist/commit.txt')) {
    try {
      const { execSync } = require('child_process');
      const hash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      writeFileSync('dist/commit.txt', hash);
    } catch {
      writeFileSync('dist/commit.txt', 'dev');
    }
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('NestJS Minimal API')
    .setDescription('API de exemplo para start rapido.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

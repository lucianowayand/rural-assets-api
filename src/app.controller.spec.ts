import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return current version', () => {
      expect(appController.getVersion()).toHaveProperty(['version']);
      expect(appController.getVersion().version).toMatch(/^[a-f0-9]{40}$/);
    });
  });
});

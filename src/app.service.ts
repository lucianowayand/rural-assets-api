import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVersion(): { version: string } {
    return { version: require('fs').readFileSync('dist/commit.txt', 'utf8').trim() };
  }
}

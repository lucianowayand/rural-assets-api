import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

class VersionDto {
  @ApiProperty()
  version: string;
}

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
      status: 200,
      description: 'Returns current version as the latest hashed commit',
      type: VersionDto,
    })
  getVersion(): { version: string } {
    return this.appService.getVersion();
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ProducerService } from './producer.service';
import { IsAuthorizedGuard } from '../user/guards/is-authorized.guard';
import { Request } from 'express';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UserDto } from '../user/dto/user.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProducerMapper } from './producer.mapper';
import { ProducerDto } from './dto/producer.dto';

interface AuthenticatedRequest extends Request {
  user: UserDto;
}

@ApiTags('producers')
@UseGuards(IsAuthorizedGuard)
@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of producers for the authenticated user.' })
  async findByUserId(@Req() req: AuthenticatedRequest): Promise<ProducerDto[]> {
    const userId = req.user.id;
    const producers = await this.producerService.findByUserId(userId);
    return producers.map((p) => ProducerMapper.fromEntityToDto(p));
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Producer created.' })
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateProducerDto,
  ): Promise<ProducerDto> {
    const userId = req.user.id;
    const producer = await this.producerService.createProducer({ dto, userId });
    return ProducerMapper.fromEntityToDto(producer);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Producer deleted.' })
  async softDelete(@Req() req: AuthenticatedRequest, @Param('id') id: string): Promise<void> {
    const userId = req.user.id;
    await this.producerService.softDelete({ id, userId });
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Producer name updated.' })
  async updateName(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateProducerDto,
  ): Promise<ProducerDto> {
    const userId = req.user.id;
    const producer = await this.producerService.update({ id, userId, dto });
    return ProducerMapper.fromEntityToDto(producer);
  }
}

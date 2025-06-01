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
import { IsAuthorizedGuard } from '../user/guards/is-authorized.guard';
import { Request } from 'express';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyMapper } from './property.mapper';
import { PropertyDto } from './dto/property.dto';

@UseGuards(IsAuthorizedGuard)
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':producerId')
  async findByProducerId(@Param('producerId') producerId: string): Promise<PropertyDto[]> {
    const properties = await this.propertyService.findByProducerId(producerId);
    return properties.map(PropertyMapper.fromEntityToDto);
  }

  @Post()
  async create(@Body() dto: CreatePropertyDto): Promise<PropertyDto> {
    const property = await this.propertyService.createProperty(dto);
    return PropertyMapper.fromEntityToDto(property);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.propertyService.softDelete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePropertyDto): Promise<PropertyDto> {
    const property = await this.propertyService.update({ id, dto });
    return PropertyMapper.fromEntityToDto(property);
  }
}

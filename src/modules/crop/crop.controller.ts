import { Controller, Get, Post, Body, Param, Delete, Patch, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { IsAuthorizedGuard } from '../user/guards/is-authorized.guard';
import { IsStaffGuard } from '../user/guards/is-staff.guard';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { CropMapper } from './crop.mapper';
import { CropDto } from './dto/crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@ApiTags('Crops')
@UseGuards(IsAuthorizedGuard)
@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get()
  @ApiOperation({ summary: 'Get all crops' })
  @ApiResponse({ status: 200, description: 'List of crops', type: [CropDto] })
  async findAll(): Promise<CropDto[]> {
    const crops = await this.cropService.findAll();
    return crops.map(CropMapper.fromEntityToDto);
  }

  @Post()
  @UseGuards(IsStaffGuard)
  @ApiOperation({ summary: 'Create a new crop' })
  @ApiBody({ type: CreateCropDto })
  @ApiResponse({ status: 201, description: 'The created crop', type: CropDto })
  async create(@Body() dto: CreateCropDto): Promise<CropDto> {
    const crop = await this.cropService.createCrop(dto);
    return CropMapper.fromEntityToDto(crop);
  }

  @Delete(':id')
  @UseGuards(IsStaffGuard)
  @ApiOperation({ summary: 'Soft delete a crop' })
  @ApiParam({ name: 'id', description: 'Crop ID' })
  @ApiResponse({ status: 204, description: 'Crop soft deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.cropService.softDelete(id);
  }

  @Patch(':id')
  @UseGuards(IsStaffGuard)
  @ApiOperation({ summary: 'Update a crop' })
  @ApiParam({ name: 'id', description: 'Crop ID' })
  @ApiBody({ type: UpdateCropDto })
  @ApiResponse({ status: 200, description: 'The updated crop', type: CropDto })
  async update(@Param('id') id: string, @Body() dto: UpdateCropDto): Promise<CropDto> {
    const crop = await this.cropService.update({ id, dto });
    return CropMapper.fromEntityToDto(crop);
  }
}

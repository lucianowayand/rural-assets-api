import { Controller, Get, Post, Body, Param, Patch, HttpCode, HttpStatus, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { IsAuthorizedGuard } from '../../user/guards/is-authorized.guard';
import { SeasonHarvestService } from './season-harvest.service';
import { CreateSeasonHarvestDto } from './dto/create-season-harvest.dto';
import { UpdateSeasonHarvestDto } from './dto/update-season-harvest.dto';
import { SeasonHarvestMapper } from './season-harvest.mapper';
import { SeasonHarvestDto } from './dto/season-harvest.dto';

@ApiTags('Season Harvests')
@UseGuards(IsAuthorizedGuard)
@Controller('season-harvests')
export class SeasonHarvestController {
  constructor(private readonly seasonHarvestService: SeasonHarvestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new season harvest (property planting a crop in a season)' })
  @ApiBody({ type: CreateSeasonHarvestDto })
  @ApiResponse({ status: 201, description: 'The created season harvest', type: SeasonHarvestDto })
  async createSeasonHarvest(@Body() dto: CreateSeasonHarvestDto): Promise<SeasonHarvestDto> {
    const seasonHarvest = await this.seasonHarvestService.createSeasonHarvest(dto);
    return SeasonHarvestMapper.fromEntityToDto(seasonHarvest);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a season harvest' })
  @ApiParam({ name: 'id', description: 'Season Harvest ID' })
  @ApiBody({ type: UpdateSeasonHarvestDto })
  @ApiResponse({ status: 200, description: 'The updated season harvest', type: SeasonHarvestDto })
  async updateSeasonHarvest(@Param('id') id: string, @Body() dto: UpdateSeasonHarvestDto): Promise<SeasonHarvestDto> {
    const seasonHarvest = await this.seasonHarvestService.updateSeasonHarvest(id, dto);
    return SeasonHarvestMapper.fromEntityToDto(seasonHarvest);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a season harvest by ID' })
  @ApiParam({ name: 'id', description: 'Season Harvest ID' })
  @ApiResponse({ status: 200, description: 'The season harvest', type: SeasonHarvestDto })
  async findSeasonHarvestById(@Param('id') id: string): Promise<SeasonHarvestDto> {
    const seasonHarvest = await this.seasonHarvestService.findSeasonHarvestById(id);
    return SeasonHarvestMapper.fromEntityToDto(seasonHarvest);
  }

  @Get('property/:propertyId')
  @ApiOperation({ summary: 'Get all season harvests for a property' })
  @ApiParam({ name: 'propertyId', description: 'Property ID' })
  @ApiResponse({ status: 200, description: 'List of season harvests for a property', type: [SeasonHarvestDto] })
  async findHarvestsByProperty(@Param('propertyId') propertyId: string): Promise<SeasonHarvestDto[]> {
    const seasonHarvests = await this.seasonHarvestService.findHarvestsByProperty(propertyId);
    return seasonHarvests.map(SeasonHarvestMapper.fromEntityToDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a season harvest' })
  @ApiParam({ name: 'id', description: 'Season Harvest ID' })
  @ApiResponse({ status: 204, description: 'Season harvest deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSeasonHarvest(@Param('id') id: string): Promise<void> {
    await this.seasonHarvestService.deleteSeasonHarvest(id);
  }
}

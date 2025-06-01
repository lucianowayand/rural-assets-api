import { Controller, Get, Post, Body, Param, Patch, HttpCode, HttpStatus, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { IsAuthorizedGuard } from '../user/guards/is-authorized.guard';
import { IsStaffGuard } from '../user/guards/is-staff.guard';
import { SeasonService } from './season.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonMapper } from './season.mapper';
import { SeasonDto } from './dto/season.dto';

@ApiTags('Seasons')
@UseGuards(IsAuthorizedGuard)
@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a season by ID' })
  @ApiParam({ name: 'id', description: 'Season ID' })
  @ApiResponse({ status: 200, description: 'The season', type: SeasonDto })
  async findSeasonById(@Param('id') id: string): Promise<SeasonDto> {
    const season = await this.seasonService.findSeasonById(id);
    return SeasonMapper.fromEntityToDto(season);
  }

  @Get()
  @ApiOperation({ summary: 'Get all seasons' })
  @ApiResponse({ status: 200, description: 'List of seasons', type: [SeasonDto] })
  async findAllSeasons(): Promise<SeasonDto[]> {
    const seasons = await this.seasonService.findAllSeasons();
    return seasons.map(SeasonMapper.fromEntityToDto);
  }

  @Post()
  @UseGuards(IsStaffGuard)
  @ApiOperation({ summary: 'Create a new season' })
  @ApiBody({ type: CreateSeasonDto })
  @ApiResponse({ status: 201, description: 'The created season', type: SeasonDto })
  async createSeason(@Body() dto: CreateSeasonDto): Promise<SeasonDto> {
    const season = await this.seasonService.createSeason(dto);
    return SeasonMapper.fromEntityToDto(season);
  }

  @Patch(':id')
  @UseGuards(IsStaffGuard)
  @ApiOperation({ summary: 'Update a season' })
  @ApiParam({ name: 'id', description: 'Season ID' })
  @ApiBody({ type: UpdateSeasonDto })
  @ApiResponse({ status: 200, description: 'The updated season', type: SeasonDto })
  async updateSeason(@Param('id') id: string, @Body() dto: UpdateSeasonDto): Promise<SeasonDto> {
    const season = await this.seasonService.updateSeason(id, dto);
    return SeasonMapper.fromEntityToDto(season);
  }

  @Delete(':id')
  @UseGuards(IsStaffGuard)
  @ApiOperation({ summary: 'Delete a season' })
  @ApiParam({ name: 'id', description: 'Season ID' })
  @ApiResponse({ status: 204, description: 'Season deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSeason(@Param('id') id: string): Promise<void> {
    await this.seasonService.deleteSeason(id);
  }
}

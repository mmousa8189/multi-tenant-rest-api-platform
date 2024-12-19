import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Application } from './schemas/application.schema';

@ApiTags('applications')
@Controller('api/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new application' })
  @ApiResponse({ status: 201, description: 'Application created successfully' })
  async create(@Request() req, @Body() createApplicationDto: CreateApplicationDto): Promise<Application> {
    return this.applicationService.create(createApplicationDto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all applications' })
  async findAll(@Request() req): Promise<Application[]> {
    return this.applicationService.findAll(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get application by ID' })
  async findOne(@Param('id') id: string, @Request() req): Promise<Application> {
    return this.applicationService.findOne(id, req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application' })
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: CreateApplicationDto,
    @Request() req,
  ): Promise<Application> {
    return this.applicationService.update(id, updateApplicationDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete application' })
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.applicationService.remove(id, req.user.userId);
  }
}

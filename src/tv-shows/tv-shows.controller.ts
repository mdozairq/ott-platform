import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { TVShowService } from './tv-shows.service';
import { CreateTVShowDto } from './dto/create-tv-show.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role-guard';
import { Roles } from 'src/role/role-decorators';

@ApiTags('tvshows')
@Controller('tvshows')
export class TVShowController {
  constructor(private readonly tvShowService: TVShowService) {}

  
  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create TV Show' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'TV Show has been successfully created' })
  create(@Body() createTVShowDto: CreateTVShowDto) {
    return this.tvShowService.create(createTVShowDto);
  }


  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List All TV Shows' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of TV shows' })
  findAll(@Query('page') page: number, @Query('page_size') pageSize: number) {
    return this.tvShowService.findAll(page, pageSize);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get TV Show by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'TV Show details' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'TV Show not found' })
  findOne(@Param('id') id: string) {
    return this.tvShowService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update TV Show' })
  @ApiResponse({ status: HttpStatus.OK, description: 'TV Show has been successfully updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'TV Show not found' })
  update(@Param('id') id: string, @Body() updateTVShowDto: Partial<CreateTVShowDto>) {
    return this.tvShowService.update(id, updateTVShowDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete TV Show' })
  @ApiResponse({ status: HttpStatus.OK, description: 'TV Show has been successfully deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'TV Show not found' })
  remove(@Param('id') id: string) {
    return this.tvShowService.remove(id);
  }
}

import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { MovieService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/role-decorators';
import { Role } from 'src/role/role-guard';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create Movie' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Movie has been successfully created' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @Roles(Role.PUBLIC)
  @ApiOperation({ summary: 'List All Movies' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of movies' })
  findAll(@Query('page') page: number, @Query('page_size') pageSize: number) {
    return this.movieService.findAll(page, pageSize);
  }

  @Get(':id')
  @Roles(Role.PUBLIC)
  @ApiOperation({ summary: 'Get Movie by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Movie details' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update Movie' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Movie has been successfully updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  update(@Param('id') id: string, @Body() updateMovieDto: Partial<CreateMovieDto>) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete Movie' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Movie has been successfully deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}

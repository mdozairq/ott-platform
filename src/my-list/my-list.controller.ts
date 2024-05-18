import { Controller, Get, Post, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { MyListService } from './my-list.service';
import { AddToListDto } from './dto/add-to-list.dto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/role-decorators';
import { Role } from 'src/role/role-guard';

@ApiTags('my-list')
@Controller('my-list')
export class MyListController {
  constructor(private readonly myListService: MyListService) {}

  
  @Post('/add')
  @Roles(Role.USER)
  @ApiHeader({
    name: 'Authorization',
    description: 'User token needed',
  })
  @ApiOperation({
    summary: 'Add to My List',
    description: 'Add a movie or TV show to the user\'s list. Each item can be identified by a unique ID, and the user\'s list should not contain duplicates.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Item has been successfully added to the list',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Item already exists in the list',
  })
  addToList(@Body() addToListDto: AddToListDto) {
    return this.myListService.addToList(addToListDto, "");
  }

  @Delete('/remove/:contentId')
  @Roles(Role.USER)
  @ApiHeader({
    name: 'Authorization',
    description: 'User token needed',
  })
  @ApiOperation({
    summary: 'Remove from My List',
    description: 'Remove an item from the user\'s list using the item\'s unique ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item has been successfully removed from the list',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Item not found in the list',
  })
  removeFromList(@Param('contentId') contentId: string) {
    return this.myListService.removeFromList(contentId, "");
  }

  @Get('/list')
  @Roles(Role.USER)
  @ApiHeader({
    name: 'Authorization',
    description: 'User token needed',
  })
  @ApiOperation({
    summary: 'List My Items',
    description: 'Retrieve all items in the user\'s list. The response should be paginated to handle potentially large lists efficiently.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Items have been successfully listed',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  listMyItems(@Query('page') page: number, @Query('page_size') pageSize: number) {
    return this.myListService.listMyItems(page, pageSize);
  }
}

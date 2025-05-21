import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { Item } from './item.entity';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by id' })
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an item' })
  update(@Param('id') id: string, @Body() updateItemDto: Partial<Item>): Promise<[number, Item[]]> {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item' })
  remove(@Param('id') id: string): Promise<number> {
    return this.itemService.remove(+id);
  }
} 
import { Controller, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all inventory items' })
  findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an inventory item by id' })
  findOne(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.findOne(+id);
  }

  @Get('item/:itemId')
  @ApiOperation({ summary: 'Get inventory items by item id' })
  findByItem(@Param('itemId') itemId: string): Promise<Inventory[]> {
    return this.inventoryService.findByItem(+itemId);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update inventory status' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ): Promise<[number, Inventory[]]> {
    return this.inventoryService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an inventory item' })
  remove(@Param('id') id: string): Promise<number> {
    return this.inventoryService.remove(+id);
  }
} 
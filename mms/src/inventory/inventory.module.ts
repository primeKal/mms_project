import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { inventoryProviders } from './inventory.provider';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, ...inventoryProviders],
  exports: [InventoryService],
})
export class InventoryModule {} 
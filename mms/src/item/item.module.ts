import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { itemProviders } from './item.provider';

@Module({
  controllers: [ItemController],
  providers: [ItemService, ...itemProviders],
  exports: [ItemService],
})
export class ItemModule {} 
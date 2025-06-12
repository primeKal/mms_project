import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { kitchenProvider, kitchenPayloadProvider, itemCountProvider } from './kitchen.provider';
import { ItemModule } from 'src/item/item.module';
import { PaginationService } from 'src/utils/services/pagination.service';
@Module({
  controllers: [KitchenController],
  providers: [PaginationService, KitchenService, ...kitchenProvider, ...kitchenPayloadProvider, ...itemCountProvider],
  exports: [KitchenService],
  imports: [ItemModule]
})
export class KitchenModule {}

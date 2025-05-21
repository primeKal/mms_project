import { Module } from '@nestjs/common';
import { ProcurementController } from './procurement.controller';
import { ProcurementService } from './procurement.service';
import { procurementProviders } from './procurement.provider';
import { inventoryProviders } from '../inventory/inventory.provider';

@Module({
  controllers: [ProcurementController],
  providers: [
    ProcurementService,
    ...procurementProviders,
    ...inventoryProviders
  ],
  exports: [ProcurementService],
})
export class ProcurementModule {} 
import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { billingProvider } from './billing.provider';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  controllers: [BillingController],
  providers: [...billingProvider, BillingService, PaginationService],
})
export class BillingModule { }

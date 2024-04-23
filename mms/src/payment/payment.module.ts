import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentProvider } from './payment.provider';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, ...paymentProvider, PaginationService],
})
export class PaymentModule { }

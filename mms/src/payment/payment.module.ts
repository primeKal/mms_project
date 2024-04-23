import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentProvider } from './payment.provider';
import { PaginationService } from 'src/utils/services/pagination.service';
import { OrderModule } from 'src/order/order.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, ...paymentProvider, PaginationService],
  imports: [OrderModule],
})
export class PaymentModule { }

import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentProvider } from './payment.provider';
import { PaginationService } from 'src/utils/services/pagination.service';
import { OrderModule } from 'src/order/order.module';
import { PaymentAgregatorService } from 'src/utils/services/payment.service';
import { PaymentMethodModule } from 'src/payment-method/payment-method.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, ...paymentProvider, PaginationService, PaymentAgregatorService],
  imports: [OrderModule, PaymentMethodModule],
})
export class PaymentModule { }

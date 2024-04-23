import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { paymentMethodProvider } from './method.provider';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, ...paymentMethodProvider, PaginationService]
})
export class PaymentMethodModule { }

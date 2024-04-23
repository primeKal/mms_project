import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProvider } from './order.provider';
import { orderLineProvider } from './order.line.provider';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerModule } from 'src/customer/customer.module';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  providers: [OrderService, ...orderProvider, ...orderLineProvider, PaginationService],
  controllers: [OrderController],
  imports: [CustomerModule],
  exports: [OrderService]
})
export class OrderModule { }

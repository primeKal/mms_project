import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProvider } from './order.provider';
import { orderLineProvider } from './order.line.provider';

@Module({
  providers: [OrderService, ...orderProvider, ...orderLineProvider],
  controllers: [OrderController]
})
export class OrderModule {}

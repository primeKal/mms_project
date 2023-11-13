import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { customerProvider } from './customer.provider';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, ...customerProvider,PaginationService],
  exports: [CustomerService]
})
export class CustomerModule {}

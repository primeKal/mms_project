import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProvider } from './product.provider';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ...productProvider, PaginationService],
  exports: [ProductService]
})
export class ProductModule {}

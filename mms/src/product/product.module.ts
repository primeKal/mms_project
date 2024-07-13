import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProvider } from './product.provider';
import { PaginationService } from 'src/utils/services/pagination.service';
import { ProductCategoryModule } from 'src/product-category/product-category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ...productProvider, PaginationService],
  // exports: [ProductService]
  imports: [ProductCategoryModule]
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { productCategoryProvider } from './product-category.provider';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductModule } from 'src/product/product.module';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  providers: [...productCategoryProvider, ProductCategoryService, PaginationService],
  controllers: [ProductCategoryController],
  // imports: [ProductModule]
  exports: [ProductCategoryService]
})
export class ProductCategoryModule { }

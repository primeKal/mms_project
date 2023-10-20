import { Module } from '@nestjs/common';
import { ProductCategory } from './product-category';
import { ProductCategoryService } from './product-category.service';

@Module({
  providers: [ProductCategory, ProductCategoryService]
})
export class ProductCategoryModule {}

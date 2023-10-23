import { Module } from '@nestjs/common';
import { productCategoryProvider } from './product-category.provider';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [...productCategoryProvider, ProductCategoryService],
  controllers: [ProductCategoryController],
  imports: [ProductModule]
})
export class ProductCategoryModule {}

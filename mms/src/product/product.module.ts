import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProvider } from './product.provider';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ...productProvider]
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { MenuModule } from './menu/menu.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { TableModule } from './table/table.module';
import { OrderModule } from './order/order.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/http.exceptions.handler';

@Module({
  imports: [DatabaseModule, CompanyModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ProductModule, MenuModule, ProductCategoryModule, TableModule, OrderModule],
  controllers: [AppController],
  providers: [AppService,     {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CustomerModule } from 'src/customer/customer.module';
import { CompanyModule } from 'src/company/company.module';
import { OrderModule } from 'src/order/order.module';
import { MenuModule } from 'src/menu/menu.module';
import { TableModule } from 'src/table/table.module';
import { orderProvider } from 'src/order/order.provider';
import { menuProvider } from 'src/menu/menu.provider';
import { tableProvider } from 'src/table/table.provider';
import { productCategoryProvider } from 'src/product-category/product-category.provider';
import { productProvider } from 'src/product/product.provider';
import { customerProvider } from 'src/customer/customer.provider';
import { orderLineProvider } from 'src/order/order.line.provider';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ...orderProvider, ...menuProvider, ...tableProvider,...productCategoryProvider,
              ...productProvider, ...customerProvider,...orderLineProvider],
  imports: []
})
export class ReportsModule {}

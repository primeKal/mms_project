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
import { CustomerModule } from './customer/customer.module';
// import { TelegrafModule } from 'nestjs-telegraf';
import { RoleModule } from './role/role.module';
import { ReportsModule } from './reports/reports.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentModule } from './payment/payment.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [DatabaseModule,
    CompanyModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    MenuModule,
    ProductCategoryModule,
    TableModule,
    OrderModule,
    CustomerModule,
    // TelegrafModule.forRoot({
    //   token: process.env.TELEGRAM_BOT_TOKEN,
    // }),
    RoleModule,
    ReportsModule,
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', '..', 'uploads'),
        serveRoot: '/uploads',
      }
    ),
    PaymentMethodModule,
    PaymentModule,
    BillingModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },],
})
export class AppModule { }

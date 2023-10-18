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

@Module({
  imports: [DatabaseModule, CompanyModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }), ProductModule, MenuModule, ProductCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

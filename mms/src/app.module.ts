import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, CompanyModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

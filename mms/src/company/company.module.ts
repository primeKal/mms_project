import { Module, forwardRef } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { companyProvider } from './company.provider';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { PaginationService } from 'src/utils/services/pagination.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [...companyProvider, CompanyService, PaginationService],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}

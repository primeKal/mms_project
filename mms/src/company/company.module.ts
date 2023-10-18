import { Module, forwardRef } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { companyProvider } from './company.provider';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [...companyProvider, CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}

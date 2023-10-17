import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [JwtModule.register({
    secret: "dmad,samda.,smda.,smda.,sdm.,samda.,sdm.,sa",
    // privateKey:'sdlklkdsasalkdaslksa',
    signOptions: { expiresIn: "1d" }
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }

import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CompanyModule),
    JwtModule.register({
      secret: "dmad,samda.,smda.,smda.,sdm.,samda.,sdm.,sa",
      // privateKey:'sdlklkdsasalkdaslksa',
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly companyService: CompanyService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: "dmad,samda.,smda.,smda.,sdm.,samda.,sdm.,sa",
        });  
    }
    async validate(payload: any){
      let user = await this.companyService.getOneCompanyById(payload.id)
      if (!user){
        throw new UnauthorizedException();
      }
      return user.dataValues
    }
}
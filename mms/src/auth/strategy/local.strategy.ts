import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { CompanyService } from 'src/company/company.service';
import { AuthService } from '../auth.service';


@Injectable() 
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private companyService: CompanyService, private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(username: string, password: string): Promise<any> {
    let user = await this.companyService.findUserByEmail(username)
    if(!user){
      console.log("user with this email not found")
      throw new UnauthorizedException(); 
    }
    if ( !await bcrypt.compare(password,user.password)){
      console.log("incorrect password for this user")
      throw new UnauthorizedException(); 
    }
    let data = await this.authService.generateToken(user.dataValues);
    return data
  }
}
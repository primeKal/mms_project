import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService : JwtService ){}

    async generateToken(payload: any): Promise<any>{
        console.log(payload)
        let data = await this.jwtService.signAsync(payload)
        let toReturnCompany: any = { ...payload };
        toReturnCompany.token = data
        console.log("saved ", toReturnCompany)
        delete toReturnCompany.password
        return toReturnCompany
      }
}

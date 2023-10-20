import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CompanyService } from "src/company/company.service";
import { AuthService } from "../auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly companyService: CompanyService, private authService: AuthService) {
        super({
            clientID: "10485540331-p2njgpl3qtvhso8t74usave2qsjogq8r.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "https://blue-distinct-hare.cyclic.cloud/auth/callback/google",
            scope: ['email', 'profile']
        });
    }
    async validate(accessToken: any, refreshToken: any, profile: any, done: VerifyCallback) {
        console.log(profile)
        const { name, emails, photos, displayName } = profile
        let user = await this.companyService.findUserByEmail(emails[0]?.value)
        if (user === null){
            console.log("in create user")
            user = await this.companyService.createCompanyWithOutPW({
                name: name.givenName + name.familyName,
                email: emails[0]?.value,
                username: displayName,
                authType : "GOOGLE",
                hasPassword : false
            })
        }
        console.log(user)
        let token = await this.authService.generateToken({
            id: user.id,
        });
        let toReturnUser: any = { ...user.dataValues };
        toReturnUser.token = token
        delete toReturnUser.password
        done(null, toReturnUser)
    }
}
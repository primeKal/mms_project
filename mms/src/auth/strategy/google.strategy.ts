import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from "../auth.service";
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly companyService: CompanyService
    ) {
        super({
            clientID: "10485540331-p2njgpl3qtvhso8t74usave2qsjogq8r.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "https://blue-distinct-hare.cyclic.cloud/auth/callback/google",
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: any, refreshToken: any, profile: any, done: VerifyCallback) {
        try {
            const { name, emails, photos, displayName } = profile;
            const email = emails[0]?.value;

            // Try to find existing user
            let user = await this.userService.findByEmail(email);

            // If user doesn't exist, create new company and user
            if (!user) {
                // Create company and user using the createCompany API
                const result = await this.companyService.createCompany({
                    name: `${name.givenName}'s Company`,
                    email: email,
                    username: displayName,
                    password: Math.random().toString(36).slice(-8), // Generate random password
                    authType: 'GOOGLE'
                });

                // The result already contains the token and user data
                done(null, result);
                return;
            }

            // Generate token for existing user
            const token = await this.authService.generateToken(user);
            done(null, token);
        } catch (error) {
            done(error, false);
        }
    }
}
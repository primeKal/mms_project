import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(user: any) {
        const payload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles?.map(role => role.name) || [],
            company: user.company ? {
                id: user.company.id,
                name: user.company.name,
                email: user.company.email
            } : null
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                authType: user.authType,
                phoneNumber: user.phoneNumber,
                profileImage: user.profileImage,
                roles: user.roles?.map(role => ({
                    id: role.id,
                    name: role.name
                })) || [],
                company: user.company ? {
                    id: user.company.id,
                    name: user.company.name,
                    email: user.company.email,
                    address: user.company.address,
                    contact_information: user.company.contact_information,
                    primaryColor: user.company.primaryColor,
                    secondaryColor: user.company.secondaryColor,
                    specialFeatures: user.company.specialFeatures,
                    imgUrl: user.company.imgUrl,
                    moto: user.company.moto,
                    
                } : null
            }
        };
    }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable() 
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(email);
      
      if (!await bcrypt.compare(password, user.password)) {
        throw new UnauthorizedException('Invalid password');
      }

      return this.authService.generateToken(user);
    } catch (error) {
      if (error.message === 'User not found') {
        throw new UnauthorizedException('User not found');
      }
      throw error;
    }
  }
}
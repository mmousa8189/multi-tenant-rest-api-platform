import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Check if credentials match admin credentials
    if (
      email !== this.configService.get('ADMIN_EMAIL') ||
      password !== this.configService.get('ADMIN_PASSWORD')
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email, role: 'admin' };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

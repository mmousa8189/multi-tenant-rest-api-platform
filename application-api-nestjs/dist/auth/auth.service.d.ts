import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    private generateToken;
}

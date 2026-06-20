import { UserRepository } from '../database/mongodb/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    register(data: any): Promise<{
        id: string;
        email: string;
    }>;
    login(data: any): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    changePassword(userId: string, data: any): Promise<import("../database/mongodb/schemas/user.schema").UserDocument | null>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(data: any): Promise<{
        message: string;
    }>;
}

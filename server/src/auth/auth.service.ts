import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../database/mongodb/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async register(data: any) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }
    const password_hash = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      email: data.email,
      password_hash,
      name: data.name,
      dob: data.dob,
      gender: data.gender,
      phone: data.phone,
    });
    return { id: user._id.toString(), email: user.email };
  }

  async login(data: any) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const valid = await bcrypt.compare(data.password, user.password_hash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { email: user.email, sub: user._id.toString(), role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user._id.toString(), email: user.email, role: user.role }
    };
  }

  async changePassword(userId: string, data: any) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(data.currentPassword, user.password_hash);
    if (!valid) throw new UnauthorizedException('Invalid current password');

    const newHash = await bcrypt.hash(data.newPassword, 10);
    return this.userRepository.update(userId, { password_hash: newHash });
  }
}

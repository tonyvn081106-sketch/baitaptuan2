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

  async forgotPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return { message: 'Nếu email tồn tại, một mã xác thực sẽ được gửi tới.' };
    }
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15);
    
    await this.userRepository.update(user._id.toString(), {
      resetPasswordCode: code,
      resetPasswordExpires: expires as any
    });
    
    console.log(`\n=========================================`);
    console.log(`[FAKE EMAIL] QUÊN MẬT KHẨU CHO: ${email}`);
    console.log(`[FAKE EMAIL] MÃ OTP CỦA BẠN LÀ: ${code}`);
    console.log(`=========================================\n`);
    
    return { message: 'Nếu email tồn tại, một mã xác thực sẽ được gửi tới.' };
  }

  async resetPassword(data: any) {
    const { email, code, newPassword } = data;
    const user = await this.userRepository.findByEmail(email);
    
    if (!user || user.resetPasswordCode !== code || !user.resetPasswordExpires || new Date(user.resetPasswordExpires) < new Date()) {
      throw new UnauthorizedException('Mã xác thực không hợp lệ hoặc đã hết hạn');
    }
    
    const newHash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(user._id.toString(), {
      password_hash: newHash,
      resetPasswordCode: null as any,
      resetPasswordExpires: null as any
    });
    
    return { message: 'Mật khẩu đã được đặt lại thành công' };
  }
}

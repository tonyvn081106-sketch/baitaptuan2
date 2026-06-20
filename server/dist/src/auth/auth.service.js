"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../database/mongodb/repositories/user.repository");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(data) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new common_1.UnauthorizedException('Email already exists');
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
    async login(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(data.password, user.password_hash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { email: user.email, sub: user._id.toString(), role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user._id.toString(), email: user.email, role: user.role }
        };
    }
    async changePassword(userId, data) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const valid = await bcrypt.compare(data.currentPassword, user.password_hash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid current password');
        const newHash = await bcrypt.hash(data.newPassword, 10);
        return this.userRepository.update(userId, { password_hash: newHash });
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return { message: 'Nếu email tồn tại, một mã xác thực sẽ được gửi tới.' };
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 15);
        await this.userRepository.update(user._id.toString(), {
            resetPasswordCode: code,
            resetPasswordExpires: expires
        });
        console.log(`\n=========================================`);
        console.log(`[FAKE EMAIL] QUÊN MẬT KHẨU CHO: ${email}`);
        console.log(`[FAKE EMAIL] MÃ OTP CỦA BẠN LÀ: ${code}`);
        console.log(`=========================================\n`);
        return { message: 'Nếu email tồn tại, một mã xác thực sẽ được gửi tới.' };
    }
    async resetPassword(data) {
        const { email, code, newPassword } = data;
        const user = await this.userRepository.findByEmail(email);
        if (!user || user.resetPasswordCode !== code || !user.resetPasswordExpires || new Date(user.resetPasswordExpires) < new Date()) {
            throw new common_1.UnauthorizedException('Mã xác thực không hợp lệ hoặc đã hết hạn');
        }
        const newHash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(user._id.toString(), {
            password_hash: newHash,
            resetPasswordCode: null,
            resetPasswordExpires: null
        });
        return { message: 'Mật khẩu đã được đặt lại thành công' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
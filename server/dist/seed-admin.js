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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const bcrypt = __importStar(require("bcrypt"));
const path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(__dirname, '.env') });
const MONGODB_URI = process.env.DATABASE_URL || 'mongodb+srv://tonyvn081106_db_user:123456a%40@cluster0.iptss4p.mongodb.net/DatLich?appName=Cluster0';
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    name: String,
    role: { type: String, default: 'GUEST', enum: ['GUEST', 'ADMIN', 'RECEPTIONIST'] }
});
const User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected successfully.');
        const adminEmail = 'admin@gmail.com';
        const existing = await User.findOne({ email: adminEmail });
        if (existing) {
            console.log('Admin already exists. Updating password and role...');
            existing.password_hash = await bcrypt.hash('admin123', 10);
            existing.role = 'ADMIN';
            await existing.save();
            console.log('Admin account updated successfully!');
            return;
        }
        const password_hash = await bcrypt.hash('admin123', 10);
        await User.create({
            email: adminEmail,
            password_hash,
            name: 'Super Admin',
            role: 'ADMIN'
        });
        console.log('Admin account created successfully!');
    }
    catch (error) {
        console.error('Seed error:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('Disconnected.');
    }
}
seed();
//# sourceMappingURL=seed-admin.js.map
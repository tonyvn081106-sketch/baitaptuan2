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
const path_1 = require("path");
dotenv.config({ path: (0, path_1.resolve)(__dirname, '.env') });
const MONGODB_URI = process.env.DATABASE_URL || 'mongodb+srv://tonyvn081106_db_user:123456a%40@cluster0.iptss4p.mongodb.net/DatLich?appName=Cluster0';
const roomSchema = new mongoose_1.default.Schema({
    room_number: { type: String, required: true },
    name: { type: String, required: true },
    destination: { type: String, required: true },
    house_name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    description: String,
    image_url: String,
    status: { type: String, default: 'AVAILABLE', enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'] }
});
const Room = mongoose_1.default.models.Room || mongoose_1.default.model('Room', roomSchema);
const branches = [
    { name: "Cơ sở Hoàn Kiếm", code: "HK" },
    { name: "Cơ sở Tây Hồ", code: "TH" },
    { name: "Cơ sở Cầu Giấy", code: "CG" }
];
const houses = [
    { name: "EmCii Homestay", code: "EMC" },
    { name: "Sunshine Homestay", code: "SUN" },
    { name: "Cozy Homestay", code: "COZ" }
];
const roomTypes = [
    {
        type: "Phòng Đơn",
        code: "S",
        basePrice: 400000,
        desc: "Phòng dành cho 1 người, nhỏ gọn, tiện nghi đầy đủ, thiết kế tối giản hiện đại."
    },
    {
        type: "Phòng Đôi",
        code: "D",
        basePrice: 650000,
        desc: "Phòng dành cho 2 người, không gian thoáng đãng, có cửa sổ lớn đón ánh sáng tự nhiên."
    },
    {
        type: "Căn hộ Studio",
        code: "ST",
        basePrice: 850000,
        desc: "Căn hộ khép kín tích hợp bếp nhỏ, máy giặt, phù hợp cho cặp đôi lưu trú dài ngày."
    },
    {
        type: "Phòng Gia Đình",
        code: "F",
        basePrice: 1200000,
        desc: "Phòng diện tích lớn với 2 giường đôi, bàn ăn gia đình và khu vực sinh hoạt chung rộng rãi."
    }
];
const seedData = [];
let roomIndex = 1;
branches.forEach((branch) => {
    houses.forEach((house) => {
        roomTypes.forEach((rt) => {
            const randomPriceOffset = Math.floor(Math.random() * 5) * 50000;
            const finalPrice = rt.basePrice + randomPriceOffset;
            const randomRating = (8.0 + Math.random() * 1.8).toFixed(1);
            seedData.push({
                room_number: `${branch.code}-${house.code}-${rt.code}-${Math.floor(Math.random() * 1000)}`,
                name: rt.type,
                destination: branch.name,
                house_name: house.name,
                price: finalPrice,
                rating: Number(randomRating),
                description: rt.desc,
                image_url: `https://picsum.photos/seed/room${roomIndex}/600/400`,
                status: "AVAILABLE"
            });
            roomIndex++;
        });
    });
});
async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected successfully.');
        console.log('Clearing old mock rooms...');
        await Room.deleteMany({ destination: { $in: branches.map(b => b.name) } });
        console.log(`Inserting ${seedData.length} new rooms...`);
        await Room.insertMany(seedData);
        console.log('Seed completed successfully!');
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
//# sourceMappingURL=seed-rooms.js.map
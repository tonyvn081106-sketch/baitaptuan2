"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const room_repository_1 = require("../database/mongodb/repositories/room.repository");
let RoomsService = class RoomsService {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async onModuleInit() {
        const count = await this.roomRepository.findAll();
        if (count.length === 0) {
            await this.roomRepository.create({
                name: 'Khách sạn Mường Thanh Luxury',
                destination: 'Đà Nẵng',
                price: 1500000,
                rating: 4.8,
                description: 'Khách sạn sang trọng với tầm nhìn ra biển Mỹ Khê.',
                image_url: 'https://picsum.photos/seed/dananghotel/600/400',
                status: 'AVAILABLE'
            });
            await this.roomRepository.create({
                name: 'Vinpearl Resort & Spa',
                destination: 'Vũng Tàu',
                price: 2500000,
                rating: 4.9,
                description: 'Nghỉ dưỡng đẳng cấp quốc tế 5 sao.',
                image_url: 'https://picsum.photos/seed/vungtauresort/600/400',
                status: 'AVAILABLE'
            });
            await this.roomRepository.create({
                name: 'InterContinental Hanoi',
                destination: 'Hà Nội',
                price: 3200000,
                rating: 5.0,
                description: 'Khách sạn nổi trên mặt hồ Tây.',
                image_url: 'https://picsum.photos/seed/hanoihotel/600/400',
                status: 'AVAILABLE'
            });
            console.log('Dummy rooms seeded!');
        }
    }
    async search(destination) {
        if (destination) {
            return this.roomRepository.findByDestination(destination);
        }
        return this.roomRepository.findAll();
    }
    async create(roomData) {
        return this.roomRepository.create({
            ...roomData,
            status: 'AVAILABLE',
            rating: 0,
        });
    }
    async findOne(id) {
        const room = await this.roomRepository.findById(id);
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        return room;
    }
    async update(id, updateData) {
        const updated = await this.roomRepository.update(id, updateData);
        if (!updated)
            throw new common_1.NotFoundException('Room not found');
        return updated;
    }
    async remove(id) {
        const deleted = await this.roomRepository.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Room not found');
        return deleted;
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_repository_1.RoomRepository])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map
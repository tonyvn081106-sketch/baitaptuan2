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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const booking_repository_1 = require("../database/mongodb/repositories/booking.repository");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let BookingsService = class BookingsService {
    bookingRepository;
    notificationsGateway;
    constructor(bookingRepository, notificationsGateway) {
        this.bookingRepository = bookingRepository;
        this.notificationsGateway = notificationsGateway;
    }
    async findAll(userId, role) {
        if (role === 'GUEST') {
            return this.bookingRepository.findAllWithRelations({ user_id: userId });
        }
        return this.bookingRepository.findAllWithRelations();
    }
    async create(userId, data) {
        const newCheckIn = new Date(data.check_in_date);
        const newCheckOut = new Date(data.check_out_date);
        const overlappingBookings = await this.bookingRepository.findAllWithRelations({
            room_id: data.room_id,
            status: { $nin: ['CANCELLED', 'CHECKED_OUT'] },
            check_in_date: { $lt: newCheckOut },
            check_out_date: { $gt: newCheckIn }
        });
        if (overlappingBookings && overlappingBookings.length > 0) {
            throw new common_1.ConflictException('Phòng này đã được đặt trong khoảng thời gian bạn chọn!');
        }
        const booking = await this.bookingRepository.create({
            user_id: userId,
            room_id: data.room_id,
            check_in_date: newCheckIn,
            check_out_date: newCheckOut,
            total_amount: data.total_amount,
            status: 'PENDING'
        });
        const populated = await booking.populate('room');
        await populated.populate('user');
        this.notificationsGateway.notifyBookingCreated(populated);
        return populated;
    }
    async updateStatus(id, status, reason) {
        const updateData = { status };
        if (reason && status === 'CANCELLED') {
            updateData.cancellation_reason = reason;
        }
        else if (status === 'CHECKED_OUT') {
            updateData.check_out_date = new Date();
        }
        const booking = await this.bookingRepository.update(id, updateData);
        if (booking) {
            this.notificationsGateway.notifyStatusChanged(booking);
        }
        return booking;
    }
    async delete(id) {
        return this.bookingRepository.delete(id);
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_repository_1.BookingRepository,
        notifications_gateway_1.NotificationsGateway])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map
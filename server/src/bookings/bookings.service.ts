import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { BookingRepository } from '../database/mongodb/repositories/booking.repository';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class BookingsService {
  constructor(
    private bookingRepository: BookingRepository,
    private notificationsGateway: NotificationsGateway
  ) { }

  async findAll(userId: string, role: string) {
    if (role === 'GUEST') {
      return this.bookingRepository.findAllWithRelations({ user_id: userId });
    }
    return this.bookingRepository.findAllWithRelations();
  }

  async create(userId: string, data: any) {
    const newCheckIn = new Date(data.check_in_date);
    const newCheckOut = new Date(data.check_out_date);

    // 1. Kiểm tra Overlap Check
    // Tiêu chí: (CheckIn Mới < CheckOut Cũ) VÀ (CheckOut Mới > CheckIn Cũ)
    // Và phòng đó không bị Hủy hoặc Đã Trả Phòng
    const overlappingBookings = await this.bookingRepository.findAllWithRelations({
      room_id: data.room_id,
      status: { $nin: ['CANCELLED', 'CHECKED_OUT'] },
      check_in_date: { $lt: newCheckOut },
      check_out_date: { $gt: newCheckIn }
    });

    if (overlappingBookings && overlappingBookings.length > 0) {
      throw new ConflictException('Phòng này đã được đặt trong khoảng thời gian bạn chọn!');
    }

    const booking = await this.bookingRepository.create({
      user_id: userId,
      room_id: data.room_id,
      check_in_date: newCheckIn,
      check_out_date: newCheckOut,
      total_amount: data.total_amount,
      status: 'PENDING'
    });

    // We should populate before returning
    const populated = await booking.populate('room');
    await populated.populate('user');

    this.notificationsGateway.notifyBookingCreated(populated);

    return populated;
  }

  async updateStatus(id: string, status: any, reason?: string) {
    const updateData: any = { status };
    if (reason && status === 'CANCELLED') {
      updateData.cancellation_reason = reason;
    } else if (status === 'CHECKED_OUT') {
      updateData.check_out_date = new Date();
    }
    const booking = await this.bookingRepository.update(id, updateData);
    if (booking) {
      this.notificationsGateway.notifyStatusChanged(booking);
    }
    return booking;
  }

  async delete(id: string) {
    return this.bookingRepository.delete(id);
  }
}

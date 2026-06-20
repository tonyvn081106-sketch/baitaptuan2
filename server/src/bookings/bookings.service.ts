import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '../database/mongodb/repositories/booking.repository';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class BookingsService {
  constructor(
    private bookingRepository: BookingRepository,
    private notificationsGateway: NotificationsGateway
  ) {}

  async findAll(userId: string, role: string) {
    if (role === 'GUEST') {
      return this.bookingRepository.findAllWithRelations({ user_id: userId });
    }
    return this.bookingRepository.findAllWithRelations();
  }

  async create(userId: string, data: any) {
    const booking = await this.bookingRepository.create({
      user_id: userId,
      room_id: data.room_id,
      check_in_date: new Date(data.check_in_date),
      check_out_date: new Date(data.check_out_date),
      total_amount: data.total_amount,
      status: 'PENDING'
    });
    
    // We should populate before returning
    const populated = await booking.populate('room');
    await populated.populate('user');
    
    this.notificationsGateway.notifyBookingCreated(populated);

    return populated;
  }

  async updateStatus(id: string, status: any) {
    const booking = await this.bookingRepository.update(id, { status });
    if (booking) {
      this.notificationsGateway.notifyStatusChanged(booking);
    }
    return booking;
  }

  async delete(id: string) {
    return this.bookingRepository.delete(id);
  }
}

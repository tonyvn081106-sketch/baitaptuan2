import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { BookingDocument, Booking } from '../schemas/booking.schema';

@Injectable()
export class BookingRepository extends BaseRepository<BookingDocument, any, any> {
  constructor(@InjectModel(Booking.name) model: Model<BookingDocument>) {
    super(model);
  }

  async findAllWithRelations(query: any = {}): Promise<BookingDocument[]> {
    return this.model.find(query).populate('user').populate('room').exec();
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: false } })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  room_id: Types.ObjectId;

  @Prop({ required: true })
  check_in_date: Date;

  @Prop({ required: true })
  check_out_date: Date;

  @Prop({ default: 'PENDING', enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] })
  status: string;

  @Prop({ required: true })
  total_amount: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

BookingSchema.virtual('room', {
  ref: 'Room',
  localField: 'room_id',
  foreignField: '_id',
  justOne: true,
});

BookingSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const retAny = ret as any;
    retAny.id = retAny._id;
    delete retAny._id;
    delete retAny.__v;
  }
});
BookingSchema.set('toObject', { virtuals: true });

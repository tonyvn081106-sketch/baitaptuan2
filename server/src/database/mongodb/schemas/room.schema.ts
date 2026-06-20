import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  destination: string;

  @Prop()
  house_name?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 1 })
  quantity: number;

  @Prop()
  description?: string;

  @Prop()
  image_url?: string;

  @Prop({ default: 'AVAILABLE', enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'] })
  status: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
RoomSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const retAny = ret as any;
    retAny.id = retAny._id;
    delete retAny._id;
    delete retAny.__v;
  }
});

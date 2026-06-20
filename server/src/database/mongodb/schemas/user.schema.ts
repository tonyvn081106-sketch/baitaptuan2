import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: false } })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop()
  name?: string;

  @Prop()
  dob?: Date;

  @Prop()
  gender?: string;

  @Prop()
  phone?: string;

  @Prop({ default: 'GUEST', enum: ['GUEST', 'ADMIN', 'RECEPTIONIST'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const retAny = ret as any;
    retAny.id = retAny._id;
    delete retAny._id;
    delete retAny.__v;
  }
});

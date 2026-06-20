import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { UserDocument, User } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument, any, any> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.model.findOne({ email }).exec();
  }
}

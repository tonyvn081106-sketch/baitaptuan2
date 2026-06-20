import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { Room, RoomDocument } from '../schemas/room.schema';

@Injectable()
export class RoomRepository extends BaseRepository<RoomDocument, any, any> {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {
    super(roomModel);
  }

  async findByDestination(destination: string): Promise<Room[]> {
    return this.roomModel.find({ 
      destination: { $regex: destination, $options: 'i' },
      status: 'AVAILABLE'
    }).exec();
  }
}

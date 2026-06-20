import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { Room, RoomDocument } from '../schemas/room.schema';
export declare class RoomRepository extends BaseRepository<RoomDocument, any, any> {
    private roomModel;
    constructor(roomModel: Model<RoomDocument>);
    findByDestination(destination: string): Promise<Room[]>;
}

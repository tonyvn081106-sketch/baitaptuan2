import { OnModuleInit } from '@nestjs/common';
import { RoomRepository } from '../database/mongodb/repositories/room.repository';
export declare class RoomsService implements OnModuleInit {
    private roomRepository;
    constructor(roomRepository: RoomRepository);
    onModuleInit(): Promise<void>;
    search(destination?: string): Promise<import("../database/mongodb/schemas/room.schema").Room[]>;
    create(roomData: any): Promise<import("../database/mongodb/schemas/room.schema").RoomDocument>;
    findOne(id: string): Promise<import("../database/mongodb/schemas/room.schema").RoomDocument>;
    update(id: string, updateData: any): Promise<import("../database/mongodb/schemas/room.schema").RoomDocument>;
    remove(id: string): Promise<import("../database/mongodb/schemas/room.schema").RoomDocument>;
}

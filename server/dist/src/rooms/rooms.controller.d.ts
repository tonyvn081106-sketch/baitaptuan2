import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    search(destination?: string): Promise<import("../database/mongodb/schemas/room.schema").Room[]>;
    findOne(id: string): Promise<import("../database/mongodb/schemas/room.schema").RoomDocument>;
    create(body: any, file: Express.Multer.File): Promise<import("../database/mongodb/schemas/room.schema").RoomDocument>;
    update(id: string, body: any, file?: Express.Multer.File): Promise<import("../database/mongodb/schemas/room.schema").RoomDocument>;
    remove(id: string): Promise<import("../database/mongodb/schemas/room.schema").RoomDocument>;
}

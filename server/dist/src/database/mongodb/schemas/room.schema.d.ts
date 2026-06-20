import { Document, Types } from 'mongoose';
export type RoomDocument = Room & Document;
export declare class Room {
    name: string;
    destination: string;
    house_name?: string;
    price: number;
    rating: number;
    quantity: number;
    description?: string;
    image_url?: string;
    status: string;
}
export declare const RoomSchema: import("mongoose").Schema<Room, import("mongoose").Model<Room, any, any, any, any, any, Room>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Room, Document<unknown, {}, Room, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    destination?: import("mongoose").SchemaDefinitionProperty<string, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    house_name?: import("mongoose").SchemaDefinitionProperty<string | undefined, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rating?: import("mongoose").SchemaDefinitionProperty<number, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image_url?: import("mongoose").SchemaDefinitionProperty<string | undefined, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Room, Document<unknown, {}, Room, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Room & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Room>;

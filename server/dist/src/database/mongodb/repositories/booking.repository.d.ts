import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { BookingDocument } from '../schemas/booking.schema';
export declare class BookingRepository extends BaseRepository<BookingDocument, any, any> {
    constructor(model: Model<BookingDocument>);
    findAllWithRelations(query?: any): Promise<BookingDocument[]>;
}

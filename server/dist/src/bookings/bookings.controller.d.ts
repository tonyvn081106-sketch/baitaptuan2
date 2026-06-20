import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    findAll(req: any): Promise<import("../database/mongodb/schemas/booking.schema").BookingDocument[]>;
    create(req: any, data: any): Promise<import("mongoose").PopulateDocumentResult<import("../database/mongodb/schemas/booking.schema").BookingDocument, {}, any, any>>;
    updateStatus(id: string, status: string): Promise<import("../database/mongodb/schemas/booking.schema").BookingDocument | null>;
    delete(id: string): Promise<import("../database/mongodb/schemas/booking.schema").BookingDocument | null>;
}

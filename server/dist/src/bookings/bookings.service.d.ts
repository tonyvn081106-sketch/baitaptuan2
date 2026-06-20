import { BookingRepository } from '../database/mongodb/repositories/booking.repository';
import { NotificationsGateway } from '../notifications/notifications.gateway';
export declare class BookingsService {
    private bookingRepository;
    private notificationsGateway;
    constructor(bookingRepository: BookingRepository, notificationsGateway: NotificationsGateway);
    findAll(userId: string, role: string): Promise<import("../database/mongodb/schemas/booking.schema").BookingDocument[]>;
    create(userId: string, data: any): Promise<import("mongoose").PopulateDocumentResult<import("../database/mongodb/schemas/booking.schema").BookingDocument, {}, any, any>>;
    updateStatus(id: string, status: any): Promise<import("../database/mongodb/schemas/booking.schema").BookingDocument | null>;
    delete(id: string): Promise<import("../database/mongodb/schemas/booking.schema").BookingDocument | null>;
}

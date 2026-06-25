import { ConfigService } from '@nestjs/config';
import { BookingRepository } from '../database/mongodb/repositories/booking.repository';
import { NotificationsGateway } from '../notifications/notifications.gateway';
export declare class PaymentsService {
    private configService;
    private bookingRepository;
    private notificationsGateway;
    private readonly logger;
    constructor(configService: ConfigService, bookingRepository: BookingRepository, notificationsGateway: NotificationsGateway);
    createPaymentUrl(bookingId: string, amount: number, ipAddr: string): string;
    verifyIpn(vnp_Params: any): Promise<any>;
    verifyReturn(vnp_Params: any): any;
    private sortObject;
}

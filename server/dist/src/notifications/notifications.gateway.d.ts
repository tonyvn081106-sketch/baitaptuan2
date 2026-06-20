import { Server } from 'socket.io';
export declare class NotificationsGateway {
    server: Server;
    notifyBookingCreated(booking: any): void;
    notifyStatusChanged(booking: any): void;
}

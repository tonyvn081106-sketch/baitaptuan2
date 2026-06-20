import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  notifyBookingCreated(booking: any) {
    this.server.emit('booking:created', { message: 'New booking created', booking });
  }

  notifyStatusChanged(booking: any) {
    this.server.emit('status:changed', { message: `Booking status changed to ${booking.status}`, booking });
  }
}

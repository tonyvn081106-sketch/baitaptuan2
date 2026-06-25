import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  notifyBookingCreated(booking: any) {
    this.server.emit('booking:created', { message: 'Có đơn đặt phòng mới cần xác nhận!', booking });
  }

  notifyStatusChanged(booking: any) {
    this.server.emit('status:changed', { message: `Trạng thái đơn đặt phòng đã thay đổi thành ${booking.status}`, booking });
  }
}

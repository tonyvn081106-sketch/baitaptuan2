import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MongoDatabaseModule } from '../database/mongodb/mongo-database.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [MongoDatabaseModule, NotificationsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}

import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';
import { Room, RoomSchema } from './schemas/room.schema';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingRepository } from './repositories/booking.repository';
import { UserRepository } from './repositories/user.repository';
import { RoomRepository } from './repositories/room.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
  ],
  providers: [BookingRepository, UserRepository, RoomRepository],
  exports: [MongooseModule, BookingRepository, UserRepository, RoomRepository],
})
export class MongoDatabaseModule {}

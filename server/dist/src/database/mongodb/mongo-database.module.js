"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_schema_1 = require("./schemas/user.schema");
const room_schema_1 = require("./schemas/room.schema");
const booking_schema_1 = require("./schemas/booking.schema");
const booking_repository_1 = require("./repositories/booking.repository");
const user_repository_1 = require("./repositories/user.repository");
const room_repository_1 = require("./repositories/room.repository");
let MongoDatabaseModule = class MongoDatabaseModule {
};
exports.MongoDatabaseModule = MongoDatabaseModule;
exports.MongoDatabaseModule = MongoDatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('DATABASE_URL'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: room_schema_1.Room.name, schema: room_schema_1.RoomSchema },
                { name: booking_schema_1.Booking.name, schema: booking_schema_1.BookingSchema },
            ]),
        ],
        providers: [booking_repository_1.BookingRepository, user_repository_1.UserRepository, room_repository_1.RoomRepository],
        exports: [mongoose_1.MongooseModule, booking_repository_1.BookingRepository, user_repository_1.UserRepository, room_repository_1.RoomRepository],
    })
], MongoDatabaseModule);
//# sourceMappingURL=mongo-database.module.js.map
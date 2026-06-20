"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.Room = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Room = class Room {
    name;
    destination;
    house_name;
    price;
    rating;
    quantity;
    description;
    image_url;
    status;
};
exports.Room = Room;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Room.prototype, "destination", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Room.prototype, "house_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Room.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Room.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], Room.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Room.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Room.prototype, "image_url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'AVAILABLE', enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'] }),
    __metadata("design:type", String)
], Room.prototype, "status", void 0);
exports.Room = Room = __decorate([
    (0, mongoose_1.Schema)()
], Room);
exports.RoomSchema = mongoose_1.SchemaFactory.createForClass(Room);
exports.RoomSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        const retAny = ret;
        retAny.id = retAny._id;
        delete retAny._id;
        delete retAny.__v;
    }
});
//# sourceMappingURL=room.schema.js.map
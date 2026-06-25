"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = __importStar(require("crypto"));
const querystring = __importStar(require("qs"));
const moment = require('moment');
const booking_repository_1 = require("../database/mongodb/repositories/booking.repository");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    configService;
    bookingRepository;
    notificationsGateway;
    logger = new common_1.Logger(PaymentsService_1.name);
    constructor(configService, bookingRepository, notificationsGateway) {
        this.configService = configService;
        this.bookingRepository = bookingRepository;
        this.notificationsGateway = notificationsGateway;
    }
    createPaymentUrl(bookingId, amount, ipAddr) {
        const tmnCode = this.configService.get('VNP_TMN_CODE', 'YOUR_TMN_CODE');
        const secretKey = this.configService.get('VNP_HASH_SECRET', 'YOUR_HASH_SECRET');
        let vnpUrl = this.configService.get('VNP_URL', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
        const returnUrl = this.configService.get('VNP_RETURN_URL', 'http://localhost:3001/payment-result');
        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const orderId = `${bookingId}_${moment(date).format('HHmmss')}`;
        const vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = `Thanh toan don hang ${bookingId}`;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        const sortedParams = this.sortObject(vnp_Params);
        const signData = querystring.stringify(sortedParams, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        sortedParams['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(sortedParams, { encode: false });
        return vnpUrl;
    }
    async verifyIpn(vnp_Params) {
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        const secretKey = this.configService.get('VNP_HASH_SECRET', 'YOUR_HASH_SECRET');
        const sortedParams = this.sortObject(vnp_Params);
        const signData = querystring.stringify(sortedParams, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        if (secureHash === signed) {
            const orderId = vnp_Params['vnp_TxnRef'];
            const rspCode = vnp_Params['vnp_ResponseCode'];
            const bookingId = orderId.split('_')[0];
            if (rspCode === '00') {
                this.logger.log(`Payment success for booking ${bookingId}`);
                const booking = await this.bookingRepository.update(bookingId, { status: 'PAID' });
                if (booking) {
                    this.notificationsGateway.notifyStatusChanged(booking);
                }
            }
            else {
                this.logger.log(`Payment failed for booking ${bookingId} with code ${rspCode}`);
            }
            return { RspCode: '00', Message: 'Confirm Success' };
        }
        else {
            return { RspCode: '97', Message: 'Fail checksum' };
        }
    }
    verifyReturn(vnp_Params) {
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        const secretKey = this.configService.get('VNP_HASH_SECRET', 'YOUR_HASH_SECRET');
        const sortedParams = this.sortObject(vnp_Params);
        const signData = querystring.stringify(sortedParams, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        if (secureHash === signed) {
            return { code: vnp_Params['vnp_ResponseCode'] };
        }
        else {
            return { code: '97' };
        }
    }
    sortObject(obj) {
        const sorted = {};
        const str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
        }
        return sorted;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        booking_repository_1.BookingRepository,
        notifications_gateway_1.NotificationsGateway])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map
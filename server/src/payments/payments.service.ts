import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as querystring from 'qs';
const moment = require('moment');
import { BookingRepository } from '../database/mongodb/repositories/booking.repository';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private configService: ConfigService,
    private bookingRepository: BookingRepository,
    private notificationsGateway: NotificationsGateway
  ) {}

  createPaymentUrl(bookingId: string, amount: number, ipAddr: string): string {
    const tmnCode = this.configService.get<string>('VNP_TMN_CODE', 'YOUR_TMN_CODE');
    const secretKey = this.configService.get<string>('VNP_HASH_SECRET', 'YOUR_HASH_SECRET');
    let vnpUrl = this.configService.get<string>('VNP_URL', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
    const returnUrl = this.configService.get<string>('VNP_RETURN_URL', 'http://localhost:3001/payment-result');

    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const orderId = `${bookingId}_${moment(date).format('HHmmss')}`;

    const vnp_Params: any = {};
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

  async verifyIpn(vnp_Params: any): Promise<any> {
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const secretKey = this.configService.get<string>('VNP_HASH_SECRET', 'YOUR_HASH_SECRET');
    const sortedParams = this.sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const orderId = vnp_Params['vnp_TxnRef'];
      const rspCode = vnp_Params['vnp_ResponseCode'];
      // Extract original booking id from orderId (bookingId_timestamp)
      const bookingId = orderId.split('_')[0];

      if (rspCode === '00') {
        // Payment success
        this.logger.log(`Payment success for booking ${bookingId}`);
        const booking = await this.bookingRepository.update(bookingId, { status: 'PAID' });
        if (booking) {
          this.notificationsGateway.notifyStatusChanged(booking);
        }
      } else {
        this.logger.log(`Payment failed for booking ${bookingId} with code ${rspCode}`);
      }
      return { RspCode: '00', Message: 'Confirm Success' };
    } else {
      return { RspCode: '97', Message: 'Fail checksum' };
    }
  }

  verifyReturn(vnp_Params: any): any {
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const secretKey = this.configService.get<string>('VNP_HASH_SECRET', 'YOUR_HASH_SECRET');
    const sortedParams = this.sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      return { code: vnp_Params['vnp_ResponseCode'] };
    } else {
      return { code: '97' };
    }
  }

  private sortObject(obj: any): any {
    const sorted: any = {};
    const str: string[] = [];
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
}

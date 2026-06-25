import { Controller, Post, Get, Body, Req, Query, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create_payment_url')
  createPaymentUrl(@Req() req, @Body() body: { bookingId: string; amount: number }) {
    const ipAddr = req.headers['x-forwarded-for'] ||
                   req.connection?.remoteAddress ||
                   req.socket?.remoteAddress ||
                   req.connection?.socket?.remoteAddress || '127.0.0.1';
    
    const url = this.paymentsService.createPaymentUrl(body.bookingId, body.amount, ipAddr);
    return { url };
  }

  @Get('vnpay_ipn')
  async vnpayIpn(@Query() query: any, @Res() res: any) {
    const result = await this.paymentsService.verifyIpn(query);
    return res.status(200).json(result);
  }

  @Get('vnpay_return')
  vnpayReturn(@Query() query: any) {
    const result = this.paymentsService.verifyReturn(query);
    return result; // Or redirect
  }
}

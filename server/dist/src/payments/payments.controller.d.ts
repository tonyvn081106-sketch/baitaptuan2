import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPaymentUrl(req: any, body: {
        bookingId: string;
        amount: number;
    }): {
        url: string;
    };
    vnpayIpn(query: any, res: any): Promise<any>;
    vnpayReturn(query: any): any;
}

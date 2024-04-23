import { Injectable } from '@nestjs/common';
import { AxiosResponse, Axios } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/order/order.entity';
import { PaymentModel } from 'src/payment/payment.entity';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class PaymentAgregatorService {
    constructor(
        private paymentService: PaymentService
    ) { }

    async performPaymentOperation(order: Order, paymentType: string): Promise<PaymentModel> {
        // Create a payment object based on the order
        return new PaymentModel();
    }
    async createPayment(order: Order) {
        const payment = new PaymentModel();
        payment.orderId = order.id;
        payment.total = order.totalPrice;
        payment.companyId = order.companyId;
        payment.status = "Draft";
        await this.paymentService.createPayment(payment)
        // Send a request to an API
        // const response = await axios.post('http://api-url', payment);

        // Update the payment status based on the response
        // payment.status = response.data.status;

        // Return the updated payment
        return payment;
    }
    async updatePayment(payment: PaymentModel) {
        payment.status = "Confirmed";
        payment = await this.paymentService.editPayment(payment);
        return payment;
    }
    async makeChapaRequest() {

    }
    async makeTelebirrRequest() {

    }
    async makeSantimPayRequest() {

    }
}
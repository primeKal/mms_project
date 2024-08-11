import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosResponse, Axios } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/order/order.entity';
import { PaymentModel } from 'src/payment/payment.entity';
import { PaymentService } from 'src/payment/payment.service';
import { ChapaPaymentDto } from './service-dtos/chapa.payment.dto';
import { PaymentMethodModel } from 'src/payment-method/method.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PaymentAgregatorService {
    constructor(
    ) { }
    // }

    async beginTransaction(chapaPaymentDto: ChapaPaymentDto): Promise<string> {
        const requestUrl = 'https://api.chapa.co/v1/transaction/initialize';
        const baseUrl = process.env.BASE_URL || "localhost:8008"; // Assuming you have BASE_URL in your .env file
        console.log("in begin transaction")

        const { private_key, app_order_id, first_name, last_name, email, totalAmount, products, transaction_id } = chapaPaymentDto;

        const requestHeaders = {
            "Authorization": "Bearer " + private_key,
            "Content-Type": "application/json",
        };

        const reqData = {
            "amount": String(totalAmount),
            "currency": "ETB",
            "email": email,
            "first_name": "Walking Customer",
            "last_name": "Walking Customer",
            // "phone_number": "0912345678",
            "tx_ref": transaction_id,
            "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
            "return_url": "https://www.google.com/",
            "customization[title]": "Payment for my favourite merchant",
            "customization[description]": "I love online payments."
        };

        console.log("reqData", reqData);
        let response: AxiosResponse;
        try {
            response = await axios.post(requestUrl, reqData, { headers: requestHeaders });
        } catch (error) {
            console.log("errorssssssssssssssssssssssssss");
            console.error(error);
        }

        if (response.status >= 200 && response.status <= 300) {
            const responseJson = response.data;
            console.log(responseJson)
            // Assuming you have a method formFeedback in your service
            //   await this.formFeedback({ 'tx_ref': app_order_id }, 'chapa');
            return responseJson["data"]["checkout_url"];
        } else {
            throw new BadRequestException(`Request not successful, Please check the keys or consult the admin. code-${response.status}`);
        }
    }
    createChapaPaymentDto(payment: PaymentModel, order: Order, paymentMethod: PaymentMethodModel): ChapaPaymentDto {
        let chapaPaymentDto = new ChapaPaymentDto();
        chapaPaymentDto.private_key = paymentMethod.chapa_private_key || "CHASECK_TEST-8x2kpz1O5PxHUzuRmoqytQJ6YlTWkE9d";
        chapaPaymentDto.app_order_id = order.name.toString();
        chapaPaymentDto.first_name = "John";
        chapaPaymentDto.last_name = "Doe";
        chapaPaymentDto.email = `${order.customer.phoneNumber}@gmail.com`
        chapaPaymentDto.totalAmount = payment.total;
        chapaPaymentDto.products = order.orderlines.toString();
        chapaPaymentDto.transaction_id = order.uniqueCode.toString() ;

        return chapaPaymentDto;
    }

    async makeTelebirrRequest() {

    }
    async makeSantimPayRequest() {

    }
}
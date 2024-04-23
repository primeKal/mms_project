import { PaymentModel } from "../payment.entity";

export class PaymentDto {
    id?: number;
    name: string;
    paymentMethodId: number;
    orderId: number;
    total: string;
    phone: string;
    companyId: string;
    email: string;
}
export class GeneratePaymentDto {
    paymentMethodId: number;
    orderId: number;
}
export class SuccessPaymentDto {
    data: PaymentModel | any
    call_back: string;
    isSuccessful: boolean;
}
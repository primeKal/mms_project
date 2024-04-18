export class PaymentDto {
    readonly id?: number;
    readonly name: string;
    readonly paymentMethodId: number;
    readonly orderId: number;
    readonly total: string;
    readonly phone: string;
    readonly companyId: string

}
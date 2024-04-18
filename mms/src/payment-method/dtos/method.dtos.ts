export class PaymentMethodDto {
    readonly id?: number;
    readonly name: string;
    readonly type: string;
    readonly isActive: boolean;
    readonly status: string;
}
import { PAYMENT_REPOSITORY } from "src/utils/constants";
import { PaymentModel } from "./payment.entity";


export const paymentProvider = [
    {
        provide: PAYMENT_REPOSITORY,
        useValue: PaymentModel
    },
];

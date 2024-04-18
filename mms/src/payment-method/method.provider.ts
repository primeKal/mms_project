import { PAYMENT_METHOD_REPOSITORY } from "src/utils/constants";
import { PaymentMethodModel } from "./method.entity";
// import { Menu } from "./menu.entity";


export const paymentMethodProvider = [
    {
        provide: PAYMENT_METHOD_REPOSITORY,
        useValue: PaymentMethodModel
    },
];

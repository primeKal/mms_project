import { BILLING_REPOSITORY } from "src/utils/constants";
import { Billing } from "./entities/billing.entity";


export const billingProvider = [
    {
        provide: BILLING_REPOSITORY,
        useValue: Billing,
    },
];
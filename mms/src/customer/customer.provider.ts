import { CUSTOMER_REPOSITORY } from "src/utils/constants";
import { Customer } from "./customer.entity";

export const customerProvider = [
  {
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer,
  },
];
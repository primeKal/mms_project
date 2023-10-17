import { COMPANY_REPOSITORY } from "src/utils/constants";
import { Company } from "./company.entity";

export const companyProvider = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: Company,
  },
];
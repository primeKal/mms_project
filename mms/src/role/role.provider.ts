import { ROLE_REPOSITORY } from "src/utils/constants";
import { Role } from "./role.entity";


export const roleProvider = [
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
];
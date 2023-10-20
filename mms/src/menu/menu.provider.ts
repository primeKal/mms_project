import { COMPANY_REPOSITORY, MENU_REPOSITORY } from "src/utils/constants";
import { Menu } from "./menu.entity";


export const menuProvider = [
  {
    provide: MENU_REPOSITORY,
    useValue: Menu,
  },
];

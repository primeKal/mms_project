import { COMPANY_REPOSITORY, MENU_REPOSITORY, TABLE_REPOSITORY } from "src/utils/constants";
import { TableModel } from "./table.entity";
// import { Menu } from "./menu.entity";


export const tableProvider = [
  {
    provide: TABLE_REPOSITORY,
    useValue: TableModel
  },
];

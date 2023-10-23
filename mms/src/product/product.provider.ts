import { PRODUCT_REPOSITORY } from "src/utils/constants";
import { Product } from "./product.entity";


export const productProvider = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
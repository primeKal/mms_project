import { PRODUCT_CATEGORY_REPOSITORY } from "src/utils/constants";
import { ProductCategory } from "./product.category.entity";

export const productCategoryProvider = [
    {
      provide: PRODUCT_CATEGORY_REPOSITORY,
      useValue: ProductCategory,
    },
  ];

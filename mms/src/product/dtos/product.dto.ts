export class ProductDto {
    readonly name: string;
    readonly description: string;
    readonly picture?: string;
    readonly price: number;
    readonly id?: number;
    readonly companyId: number;
    readonly link: string;
    readonly productCategoryId?: number
  }
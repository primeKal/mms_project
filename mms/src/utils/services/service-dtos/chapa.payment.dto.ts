import { ProductDto } from "src/product/dtos/product.dto";

export class ChapaPaymentDto {
    private_key: string;
    app_order_id: string;
    first_name: string;
    last_name: string;
    email: string;
    totalAmount: number;
    products : string;
    transaction_id: string 
  }
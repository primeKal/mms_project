export class OrderDto{
    id? : number;
    name: string;
    totalPrice: number;
    totalTax: number;
    uniqueCode: string;
    tableId: number;
    customerPhone: string;
    // userId: number; 
    orderlines : OrderLinesDto[]  
}
export class OrderLinesDto{
    productId : number;
    quantity: number;
    currency: string;
    singlePrice: number;
}
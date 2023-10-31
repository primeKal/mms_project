import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { OrderDto } from './dtos/order.dto';

@ApiTags('Menu')
@Controller('order')
export class OrderController {

    constructor(private orderService : OrderService){

    }
    @Get()
    public async getOrders(): Promise<Order[]> {
      return this.orderService.getAllOrders();
    }

    @Get(':id')
    @ApiProperty()
    public async getAOrder(@Param('id') id: number): Promise<Order>{
      return this.orderService.getOneOrderById(id);
    }

    @Post()
    public async createOrder(@Body() body: OrderDto): Promise<Order> {
      return this.orderService.createOrder(body);
    }

    @Put()
    public async editOrder(@Body() body: OrderDto): Promise<Order> {

      return this.orderService.editOrder(body);
    }

    @Delete()
    public async deleteOrder(@Body() id): Promise<void>{
      return this.orderService.deleteOrder(id);
    }
    @Get('ByUser/:id')
    public async getOrdersByUser(@Param('id') id: number): Promise<[Order]>{
      return this.orderService.getOrdersByCompanay(id);
    }    
}

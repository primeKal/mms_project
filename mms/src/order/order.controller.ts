import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { OrderDto } from './dtos/order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { RoleGuard } from 'src/auth/guards/role.guards';
import { UpdateStatusDto } from 'src/utils/dtos/updateStatusDto';

@UseGuards(JwtAuthGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {

    constructor(private orderService : OrderService){

    }

    @UseGuards(new RoleGuard(3))
    @Get()
    public async getOrders(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Order[]> {
      return this.orderService.getAllOrders(page, pageSize);
    }

    @Get(':id')
    @ApiProperty()
    public async getAOrder(@Param('id') id: number): Promise<Order>{
      return this.orderService.getOneOrderById(id);
    }

    @Post()
    public async createOrder(@Req() req: any,@Body() body: OrderDto): Promise<Order> {
      return this.orderService.createOrder(req.user,body);
    }

    @Put()
    public async editOrder(@Body() body: OrderDto): Promise<Order> {

      return this.orderService.editOrder(body);
    }

    @Delete()
    public async deleteOrder(@Body() id): Promise<void>{
      return this.orderService.deleteOrder(id.id);
    }
    @Get('ByCompany/:id')
    public async getOrdersByUser(@Param('id') id: number): Promise<[Order]>{
      return this.orderService.getOrdersByCompany(id);
    }
   
    @Post("UpdateStatus")
    public async updateStatus(@Req() req: any,@Body() body: UpdateStatusDto): Promise<Order> {
      return this.orderService.updateOrderStatus(body);
    }
}

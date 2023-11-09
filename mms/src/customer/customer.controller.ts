import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dtos/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){
    }
    
    @Get()
    public async getCustomer(@Query('page') page: number = 10, @Query('pageSize') pageSize: number = 1): Promise<Customer[]> {
      return this.customerService.getAllCustomers(page, pageSize);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getACustomer(@Param('id') id: number): Promise<Customer>{
      return this.customerService.getOneCustomerById(id);
    }

    @Post()
    public async createCustomer(@Req() req: any,@Body() body: CustomerDto): Promise<any> {
      return this.customerService.createCustomer(body, req.user.id);
    }

    @Put()
    public async editCustomer(@Body() body: CustomerDto): Promise<Customer> {

      return this.customerService.editCustomer(body);
    }

    @Delete()
    public async deleteCustomer(@Body() id): Promise<void>{
      return this.customerService.deleteCustomer(id);
    }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { Billing } from './entities/billing.entity';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Billing")
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) { }


  @Get()
  public async getBilling(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Billing[]> {
    return this.billingService.getAllBillings(page, pageSize);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getABilling(@Param('id') id: number): Promise<Billing> {
    return this.billingService.getOneBillingById(id);
  }

  @Get('ByCompany/:id')
  public async getBillingByCompany(@Param('id') id: number): Promise<Billing[]> {
    return this.billingService.getBillingsByCompany(id);
  }

  @Post()
  public async createBilling(@Req() req: any, @Body() body: CreateBillingDto): Promise<any> {
    return this.billingService.createBilling(body);
  }

  // @Put()
  // public async editBilling(@Body() body: CreateBillingDto): Promise<Billing> {

  //   return this.billingService.editBilling(body);
  // }

  @Delete()
  public async deleteBilling(@Body() id): Promise<void> {
    return this.billingService.deleteBilling(id.id);
  }




}

import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodModel } from './method.entity';
import { PaymentMethodDto } from './dtos/method.dtos';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { UpdateStatusDto } from 'src/utils/dtos/updateStatusDto';

@ApiTags('PaymentMethod')
@Controller('paymentMethod')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {

  }

  @Get()
  public async getPaymentMethod(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<PaymentMethodModel[]> {
    return this.paymentMethodService.getAllPaymentMethods(page, pageSize);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getAPaymentMethod(@Param('id') id: number): Promise<PaymentMethodModel> {
    return this.paymentMethodService.getOnePaymentMethodById(id);
  }


  @Get('ByCompany/:id')
  public async getPaymentMethodsByCompany(@Param('id') id: number): Promise<[PaymentMethodModel]> {
    return this.paymentMethodService.getPaymentMethodsByCompany(id);
  }

  @Get('ByCompanyActive/:id')
  public async getPaymentMethodsByCompanyActive(@Param('id') id: number): Promise<[any]> {
    return this.paymentMethodService.getPaymentMethodsByCompanyActive(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createPaymentMethod(@Req() req: any, @Body() body: PaymentMethodDto): Promise<any> {
    return this.paymentMethodService.createPaymentMethod(req.user?.company?.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  public async editPaymentMethod(@Body() body: PaymentMethodDto): Promise<PaymentMethodModel> {

    return this.paymentMethodService.editPaymentMethod(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public async deletePaymentMethod(@Body() id): Promise<void> {
    return this.paymentMethodService.deletePaymentMethod(id.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("UpdateStatus")
  public async updateStatus(@Req() req: any, @Body() body: UpdateStatusDto): Promise<PaymentMethodModel> {
    return this.paymentMethodService.updateOrderStatus(body);
  }
}

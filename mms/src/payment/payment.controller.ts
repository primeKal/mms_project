import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentModel as Payment } from './payment.entity';
import { PaymentDto } from './dtos/payment.dtos';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MAX_PROFILE_PICTURE_SIZE_IN_BYTES } from 'src/utils/constants';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService){
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getPayments(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Payment[]> {
      return this.paymentService.getAllPayments(page, pageSize);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getAPayment(@Param('id') id: number): Promise<Payment>{
      return this.paymentService.getOnePaymentById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('ByCompany/:id')
    public async getPaymentByCompany(@Param('id') id: number): Promise<Payment[]>{
      return this.paymentService.getPaymentsByCompany(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('ByCategory/:id')
    public async getPaymentsByCategory(@Param('id') id: number): Promise<Payment[]>{
      return this.paymentService.getPaymentsByCategory(id);
    }

    @Post()
    public async createPayment(@Body() body: PaymentDto): Promise<any> {
      return this.paymentService.createPayment(body);
    }

    @Put()
    public async editPayment(@Body() body: PaymentDto): Promise<Payment> {

      return this.paymentService.editPayment(body);
    }

    @Delete()
    public async deletePayment(@Body() id): Promise<void>{
      return this.paymentService.deletePayment(id.id);
    }
}

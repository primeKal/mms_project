import { Inject, Injectable } from '@nestjs/common';
import { PaymentModel } from './payment.entity';
import { PAYMENT_REPOSITORY, PRODUCT_REPOSITORY } from 'src/utils/constants';
import { Op } from 'sequelize';
import { PaginationService } from 'src/utils/services/pagination.service';
import { GeneratePaymentDto, PaymentDto, SuccessPaymentDto } from './dtos/payment.dtos';
import { OrderService } from 'src/order/order.service';
import { PaymentAgregatorService } from 'src/utils/services/payment.service';
import { Order } from 'src/order/order.entity';
import { PaymentMethodService } from 'src/payment-method/payment-method.service';
import { PaymentMethodModel } from 'src/payment-method/method.entity';

@Injectable()
export class PaymentService {
    constructor(
        @Inject(PAYMENT_REPOSITORY) private readonly paymentRepository: typeof PaymentModel,
        private readonly paginationService: PaginationService<PaymentModel>,
        @Inject(OrderService) private orderService: OrderService,
        @Inject(PaymentAgregatorService) private paymentAgregatorService: PaymentAgregatorService,
        @Inject(PaymentMethodService) private paymentMethodService: PaymentMethodService

    ) {
        this.paginationService = new PaginationService<PaymentModel>(this.paymentRepository)

    }
    async getAllPayments(page, pageSize): Promise<PaymentModel[]> {
        return await this.paginationService.findAll(page, pageSize)
    }
    async createPayment(createPaymentDto): Promise<any> {
        let payment = await this.paymentRepository.create<PaymentModel>(createPaymentDto);
        return payment;
    }
    async getOnePaymentById(id: number): Promise<PaymentModel> {
        return await this.paymentRepository.findOne({
            where: {
                id: id
            }
        })
    }
    async editPayment(editPayment: any): Promise<PaymentModel> {
        var toEditPayment = await this.paymentRepository.findByPk(editPayment.id);
        try {
            return await toEditPayment.update({ ...editPayment })
        }
        catch (error) {
            console.log(error.errors)
            return error.message;
        }
    }
    async deletePayment(id: string): Promise<void> {
        var toDeletePayment = await this.paymentRepository.findByPk(id);
        return await toDeletePayment.destroy();
    }
    async getPaymentsByCompany(companyId: any): Promise<PaymentModel[]> {
        return this.paymentRepository.findAll({
            where: { companyId: companyId },
        })
    }
    async getPaymentsByCategory(companyId: any): Promise<PaymentModel[]> {
        return this.paymentRepository.findAll({
            where: { companyId: companyId },
        })
    }
    async getPaymentsByIds(ids: Array<number>) {
        return await this.paymentRepository.findAll({ where: { id: { [Op.in]: ids } } });
    }
    async generatePayment(generatePaymentDto: GeneratePaymentDto) {
        try {
            const order = await this.orderService.getOneOrderById(generatePaymentDto.orderId);
            let paymentDto = new PaymentDto();
            paymentDto.orderId = order.id;
            paymentDto.total = String(order.totalPrice);
            paymentDto.phone = order.customerPhone;
            paymentDto.companyId = String(order.companyId);
            paymentDto.email = `Walking Customer For Order ${order.id}`;
            paymentDto.paymentMethodId = generatePaymentDto.paymentMethodId;
            let success_data = await this.paymentRepository.create<PaymentModel>(paymentDto as any);
            let paymentMethod = await this.paymentMethodService.getOnePaymentMethodById(success_data.paymentMethodId);
            const redirect = await this.paymentSwitcher(success_data, order, paymentMethod);
            let returned_data = new SuccessPaymentDto();
            returned_data.data = success_data;
            returned_data.call_back = redirect as string;
            return returned_data
        }
        catch (error) {
            console.log("errror", error)
            return {
                isSuccessful: false,
                call_back: "https://google.com/payment/failed",
                data: error
            }
        }
    }
    async paymentSwitcher(payment: PaymentModel, order: Order, paymentMethod: PaymentMethodModel) {
        console.log("In payment switcher")
        console.log("payment", payment)
        console.log("order", order)
        console.log("paymentMethod", paymentMethod)
        switch (paymentMethod?.type) {
            case "Chapa":
                const payload = this.paymentAgregatorService.createChapaPaymentDto(payment, order, paymentMethod);
                return await this.paymentAgregatorService.beginTransaction(payload);
            default:
                return "https://google.com/payment/failed"
        }
    }
}

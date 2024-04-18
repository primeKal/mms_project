import { Inject, Injectable } from '@nestjs/common';
import { PaymentModel } from './payment.entity';
import { PAYMENT_REPOSITORY, PRODUCT_REPOSITORY } from 'src/utils/constants';
import { Op } from 'sequelize';
import { PaginationService } from 'src/utils/services/pagination.service';
import { PaymentDto } from './dtos/payment.dtos';

@Injectable()
export class PaymentService {
    constructor(
        @Inject(PAYMENT_REPOSITORY) private readonly paymentRepository: typeof PaymentModel,
        private readonly paginationService: PaginationService<PaymentModel>
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
}

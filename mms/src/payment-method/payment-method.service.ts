import { Inject, Injectable } from '@nestjs/common';
import { PAYMENT_METHOD_REPOSITORY, TABLE_REPOSITORY } from 'src/utils/constants';
import { PaymentMethodModel } from './method.entity';
import { PaginationService } from 'src/utils/services/pagination.service';

@Injectable()
export class PaymentMethodService {
    constructor(@Inject(PAYMENT_METHOD_REPOSITORY) private readonly paymentMethodRepository: typeof PaymentMethodModel,
        private readonly paginationService: PaginationService<PaymentMethodModel>) {
        this.paginationService = new PaginationService<PaymentMethodModel>(this.paymentMethodRepository)
    }
    async getAllPaymentMethods(page, pageSize): Promise<PaymentMethodModel[]> {
        return await this.paginationService.findAll(page, pageSize);
    }
    async createPaymentMethod(companyId, createPaymentMethodModelDto): Promise<any> {
        createPaymentMethodModelDto.companyId = companyId;
        let paymentMethodModel = await this.paymentMethodRepository.create<PaymentMethodModel>(createPaymentMethodModelDto);
        return paymentMethodModel;
    }
    async getOnePaymentMethodById(id: number): Promise<PaymentMethodModel> {
        return await this.paymentMethodRepository.findOne({
            where: {
                id: id
            },
            // include: [ProductCategory]
        })
    }
    async editPaymentMethod(editPaymentMethodModel: any): Promise<PaymentMethodModel> {
        var toEditPaymentMethodModel = await this.paymentMethodRepository.findByPk(editPaymentMethodModel.id);
        try {
            return await toEditPaymentMethodModel.update({ ...editPaymentMethodModel })
        }
        catch (error) {
            console.log(error.errors)
            return error.message;
        }
    }
    async deletePaymentMethod(id: string): Promise<void> {
        var toDeletePaymentMethodModel = await this.paymentMethodRepository.findByPk(id);
        return await toDeletePaymentMethodModel.destroy();
    }

    async getPaymentMethodsByCompany(companyId: any): Promise<any> {
        return this.paymentMethodRepository.findAll({
            where: { companyId: companyId },
        })
    }
    async updateOrderStatus(updateStatusDto: any): Promise<PaymentMethodModel> {
        let paymentMethod = await this.paymentMethodRepository.findByPk(updateStatusDto.id)
        const result = await paymentMethod.update({
            isActive: updateStatusDto.status
        });
        return result;
    }
}

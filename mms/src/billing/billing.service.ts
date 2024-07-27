import { Inject, Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { BILLING_REPOSITORY } from 'src/utils/constants';
import { Billing } from './entities/billing.entity';
import { PaginationService } from 'src/utils/services/pagination.service';

@Injectable()
export class BillingService {
  constructor(
    @Inject(BILLING_REPOSITORY) private readonly billingRepository: typeof Billing,
    private readonly paginationService: PaginationService<Billing>
  ) {
    this.paginationService = new PaginationService<Billing>(this.billingRepository);
  }

  async getAllBillings(page, pageSize): Promise<Billing[]> {
    return await this.billingRepository.findAll()
  }
  async createBilling(createBillingDto): Promise<any> {
    let billing = await this.billingRepository.create<Billing>(createBillingDto);
    return billing;
  }
  async getOneBillingById(id: number): Promise<Billing> {
    return await this.billingRepository.findOne({
      where: {
        id: id
      }
    })
  }
  async editBilling(editBilling: any): Promise<Billing> {
    var toEditBilling = await this.billingRepository.findByPk(editBilling.id);
    try {
      return await toEditBilling.update({ ...editBilling })
    }
    catch (error) {
      console.log(error.errors)
      return error.message;
    }
  }
  async deleteBilling(id: string): Promise<void> {
    var toDeleteBilling = await this.billingRepository.findByPk(id);
    return await toDeleteBilling.destroy();
  }
  async getBillingsByCompany(companyId: any): Promise<Billing[]> {
    return this.billingRepository.findAll({
      where: { companyId: { companyId } },
    })
  }

}

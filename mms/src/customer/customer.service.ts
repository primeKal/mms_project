import { Inject, Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CUSTOMER_REPOSITORY } from 'src/utils/constants';
import { PaginationService } from 'src/utils/services/pagination.service';

@Injectable()
export class CustomerService {
    constructor(
        @Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer,
        private readonly paginationService : PaginationService<Customer>
    ) {
        this.paginationService = new PaginationService<Customer>(this.customerRepository);

    }
    async getAllCustomers(page,pageSize): Promise<Customer[]> {
        return await this.paginationService.findAll(page,pageSize)
    }
    async createCustomer(createCustomerDto, companyId): Promise<any> {
        createCustomerDto.companyId = companyId;
        let customer = await this.customerRepository.create<Customer>(createCustomerDto);
        return customer;
    }
    async getOneCustomerById(id: number): Promise<Customer> {
        return await this.customerRepository.findOne({
            where: {
                id: id
            },
        })
    }
    async editCustomer(editCustomer: any): Promise<Customer> {
        var toEditCustomer = await this.customerRepository.findByPk(editCustomer.id);
        try {
            return await toEditCustomer.update({ ...editCustomer })
        }
        catch (error) {
            console.log(error.errors)
            return error.message;
        }
    }
    async deleteCustomer(id: string): Promise<void> {
        var toDeleteCustomer = await this.customerRepository.findByPk(id);
        return await toDeleteCustomer.destroy();
    }
    async getOrCreateCustomerByPhone(phoneNumber: string): Promise<number> {
        let [customer, boolean] = await this.customerRepository.findOrCreate({
            where: {
                phoneNumber: phoneNumber
            },
        })
        return customer.id
    }
}

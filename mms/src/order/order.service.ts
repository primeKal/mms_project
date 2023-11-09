import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ORDER_REPOSITORY, ORDER_LINE_REPOSITORY } from 'src/utils/constants';
import { Order } from './order.entity';
import { OrderLine } from './order.line.entity';
import { CustomerService } from 'src/customer/customer.service';
import { PaginationService } from 'src/utils/services/pagination.service';
import { toUnicode } from 'punycode';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(ORDER_LINE_REPOSITORY) private readonly orderLineRepository,
    private customerService: CustomerService,
    private readonly paginationService: PaginationService<Order>) {
    this.paginationService = new PaginationService<Order>(this.orderRepository);
  }
  async getAllOrders(page,pageSize): Promise<Order[]> {
    let toInclude = [OrderLine]
    return await this.paginationService.findAll(page,pageSize, toInclude)
  }
  async createOrder(companyId, createOrderDto: any): Promise<Order> {
    createOrderDto.companyId = companyId;
    createOrderDto.customerId = await this.customerService.getOrCreateCustomerByPhone(createOrderDto.customerPhone);
    return await this.orderRepository.create<Order>(createOrderDto, {
      include: [OrderLine]
    });
  }
  async getOneOrderById(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        id: id
      },
      include: [OrderLine]
    })
  }
  async editOrder(editOrder: any): Promise<Order> {
    var toEditOrder = await this.orderRepository.findByPk(editOrder.id);
    try {

      return await toEditOrder.update({ ...editOrder })
    }
    catch (error) {
      console.log(error.errors)
      return error.message;
    }
  }
  async deleteOrder(id: string): Promise<void> {
    var toDeleteOrder = await this.orderRepository.findByPk(id);
    return await toDeleteOrder.destroy();
  }
  async getOrdersByIds(ids: Array<number>) {
    return await this.orderRepository.findAll({ where: { id: { [Op.in]: ids } } });
  }
  async createOrderLines(orderlines: any) {
    var result = this.orderLineRepository.create(orderlines);
  }
  async getOrdersByCompanay(companyId: number): Promise<any> {
    return this.orderRepository.findAll({
      where: {
        companyId: companyId
      },
      include: [OrderLine]
    })
  }

}

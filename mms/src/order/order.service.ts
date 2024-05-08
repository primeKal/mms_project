import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ORDER_REPOSITORY, ORDER_LINE_REPOSITORY } from 'src/utils/constants';
import { Order } from './order.entity';
import { OrderLine } from './order.line.entity';
import { CustomerService } from 'src/customer/customer.service';
import { PaginationService } from 'src/utils/services/pagination.service';
import { InjectBot } from 'nestjs-telegraf';
// import { Context, Telegraf } from 'telegraf';
import { Product } from 'src/product/product.entity';
import { Customer } from 'src/customer/customer.entity';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(ORDER_LINE_REPOSITORY) private readonly orderLineRepository,
    private customerService: CustomerService,
    private readonly paginationService: PaginationService<Order>,
    // @InjectBot() private bot: Telegraf
  ) {
    this.paginationService = new PaginationService<Order>(this.orderRepository);
  }
  async getAllOrders(page, pageSize): Promise<Order[]> {
    let toInclude = [OrderLine]
    return await this.paginationService.findAll(page, pageSize, toInclude)
  }
  async createOrder(createOrderDto: any): Promise<Order> {
    // createOrderDto.companyId = 3;
    const count = this.orderRepository.count({ where: { companyId: createOrderDto.companyId } });
    createOrderDto.name = `Order/${count}`;
    createOrderDto.customerId = await this.customerService.getOrCreateCustomerByPhone(createOrderDto.customerPhone);
    let newOrder: Order = await this.orderRepository.create<Order>(createOrderDto, {
      include: [OrderLine]
    });
    // this.sendCreateOrderNotification(company)
    return newOrder
  }
  async getOneOrderById(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        id: id
      },
      include: [{
        model: OrderLine,
        include: [Product]
      }, {
        model: Customer
      }]
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
  async getOrdersByCompany(companyId: number): Promise<any> {
    return this.orderRepository.findAll({
      where: {
        companyId: companyId
      },
      include: [OrderLine]
    })
  }
  async updateOrderStatus(updateStatusDto: any): Promise<Order> {
    let order = await this.orderRepository.findByPk(updateStatusDto.id)
    const result = await order.update({
      status: updateStatusDto.status
    });
    return result;
  }

  // sendCreateOrderNotification(company: any): void {
  //   if (company.telegramChatId){
  //     this.bot.telegram.sendMessage(company.telegramChatId, `Dear ${company.name},A New Order has been submitted.`);
  //   }
  // }

}

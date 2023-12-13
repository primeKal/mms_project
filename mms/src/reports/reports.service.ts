import { Inject, Injectable } from '@nestjs/common';
import { Op, Sequelize } from 'sequelize';
import { Menu } from 'src/menu/menu.entity';
import { Order } from 'src/order/order.entity';
import { OrderLine } from 'src/order/order.line.entity';
import { ProductCategory } from 'src/product-category/product.category.entity';
import { Product } from 'src/product/product.entity';
import { TableModel } from 'src/table/table.entity';
import { TableService } from 'src/table/table.service';
import { MENU_REPOSITORY, ORDER_LINE_REPOSITORY, ORDER_REPOSITORY, PRODUCT_CATEGORY_REPOSITORY, PRODUCT_REPOSITORY, TABLE_REPOSITORY } from 'src/utils/constants';

@Injectable()
export class ReportsService {
    constructor(
        @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
        @Inject(ORDER_LINE_REPOSITORY) private readonly orderLineRepository: typeof OrderLine,
        @Inject(MENU_REPOSITORY) private readonly menuRepository: typeof Menu,
        @Inject(TABLE_REPOSITORY) private readonly tableRepository: typeof TableModel,
        @Inject(PRODUCT_CATEGORY_REPOSITORY) private readonly productCategoryRepository: typeof ProductCategory,
        @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product
    ) {

    }
    async getOrdersByDay(date: Date, companyId: number): Promise<Order[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        try {
            const orders = await this.orderRepository.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startOfDay, endOfDay],
                    },
                    // companyId: companyId
                },

            });

            return orders;
        } catch (error) {
            throw new Error(`Error fetching orders: ${error.message}`);
        }
    }

    async getTotalOrdersPerDay(companyId: number): Promise<{ date: string; totalOrders: number }[]> {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        startDate.setHours(0, 0, 0, 0);

        try {
            const results = await this.orderRepository.findAll({
                attributes: [
                    [Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt')), 'date'],
                    [Sequelize.fn('count', Sequelize.col('id')), 'totalOrders'],
                ],
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                    },
                    // companyId: companyId
                },
                group: ['date'],
                order: [['date', 'DESC']],
            });

            // Convert results to a more user-friendly format
            const formattedResults = results.map((result: any) => ({
                date: result.get('date'),
                totalOrders: result.get('totalOrders'),
            }));

            return formattedResults;
        } catch (error) {
            throw new Error(`Error fetching total orders per day: ${error.message}`);
        }
    }

    async getMostSoldProducts(companyId: number): Promise<{ productName: string; totalQuantity: number }[]> {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 15);
        startDate.setHours(0, 0, 0, 0);

        try {
            const results = await this.orderLineRepository.findAll({
                attributes: [
                    'productId',
                    [
                        Sequelize.literal('SUM("quantity")'),
                        'totalQuantity',
                    ],
                ],
                include: [
                    {
                        model: Product,
                        attributes: ['name'],
                    },
                ],
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                    },
                    // companyId: companyId
                },
                group: ['productId','product.id'],
                order: [[Sequelize.literal('product.name'), 'DESC']],
                limit: 10, // Change the limit based on your requirements
            });

            // Convert results to a more user-friendly format
            const formattedResults = results.map((result: any) => ({
                productName: result.product.name,
                totalQuantity: result.get('totalQuantity'),
                produtID: result.get('productId')
            }));

            return formattedResults;
        } catch (error) {
            throw new Error(`Error fetching most sold products: ${error.message}`);
        }
    }


    async getTotalSalesForPast30Days(companyId: number): Promise<{ date: string; totalSales: number }[]> {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        startDate.setHours(0, 0, 0, 0);

        try {
            const results = await this.orderRepository.findAll({
                attributes: [
                    [
                        Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt')),
                        'date',
                    ],
                    [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'totalSales'],
                ],
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                    },
                    // companyId: companyId
                },
                group: ['date'],
                order: [['date', 'DESC']],
            });

            // Convert results to a more user-friendly format
            const formattedResults = results.map((result: any) => ({
                date: result.get('date'),
                totalSales: result.get('totalSales'),
            }));

            return formattedResults;
        } catch (error) {
            throw new Error(`Error fetching total sales for the past 30 days: ${error.message}`);
        }
    }


    async getTotalSalesPerMonth(companyId: number): Promise<{ month: string; totalSales: number }[]> {
        try {
            const results = await this.orderRepository.findAll({
                attributes: [
                    [
                        Sequelize.fn('date_trunc', 'month', Sequelize.col('createdAt')),
                        'month',
                    ],
                    [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'totalSales'],
                ],
                group: ['month'],
                order: [['month', 'DESC']],
                where: {
                    // companyId: companyId
                }
            });

            // Convert results to a more user-friendly format
            const formattedResults = results.map((result: any) => ({
                month: result.get('month'),
                totalSales: result.get('totalSales'),
            }));

            return formattedResults;
        } catch (error) {
            throw new Error(`Error fetching total sales per month: ${error.message}`);
        }
    }
}

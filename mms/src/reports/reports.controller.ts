import { Controller, Param, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { Order } from 'src/order/order.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }


    @Get('/getOrdersByDate/:date')
    public async getOrdersByDate(@Param('date') date: string): Promise<Order[]> {
        const dateToFetch = new Date(date);
        return this.reportsService.getOrdersByDay(dateToFetch);
    }

    @Get('GetOrderCountOf15Days')
    public async getOrdersCount(): Promise<any> {
        const totalOrdersPerDay = await this.reportsService.getTotalOrdersPerDay();
        console.log(totalOrdersPerDay);
        return totalOrdersPerDay;
    }
    @Get('GetMostSoldProductsIn15Days')
    public async getMostSOldProduct(): Promise<any> {
        const mostSoldProducts = await this.reportsService.getMostSoldProducts();
        console.log(mostSoldProducts);
        return mostSoldProducts;
    }

    @Get('getTotalSalesForPast30Days')
    public async getTotalSalesForPast30Days(): Promise<any> {
        const getTotalSalesForPast30Days = await this.reportsService.getTotalSalesForPast30Days();
        console.log(getTotalSalesForPast30Days);
        return getTotalSalesForPast30Days;
    }

    @Get('getTotalSalesPerMonth')
    public async getTotalSalesPerMonth(): Promise<any> {
        const getTotalSalesPerMonth = await this.reportsService.getTotalSalesPerMonth();
        console.log(getTotalSalesPerMonth);
        return getTotalSalesPerMonth;
    }
}

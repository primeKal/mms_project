import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { TableModel } from './table.entity';
import { TableDto } from './dtos/table.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { UpdateStatusDto } from 'src/utils/dtos/updateStatusDto';

@UseGuards(JwtAuthGuard)
@ApiTags('Table')
@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService){

    }
    @Get()
    public async getTable(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<TableModel[]> {
      return this.tableService.getAllTables(page,pageSize);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getATable(@Param('id') id: number): Promise<TableModel>{
      return this.tableService.getOneTableById(id);
    }

    @Get('ByCompany/:id')
    public async getTablesByCompany(@Param('id') id: number): Promise<[TableModel]>{
      return this.tableService.getTablesByCompany(id);
    }

    @Post()
    public async createTable(@Req() req: any, @Body() body: TableDto): Promise<any> {
      return this.tableService.createTable(req.user?.company?.id,body);
    }

    @Put()
    public async editTable(@Body() body: TableDto): Promise<TableModel> {

      return this.tableService.editTable(body);
    }

    @Delete()
    public async deleteTable(@Body() id): Promise<void>{
      return this.tableService.deleteTable(id.id);
    }

    @Post("UpdateStatus")
    public async updateStatus(@Req() req: any,@Body() body: UpdateStatusDto): Promise<TableModel> {
      return this.tableService.updateOrderStatus(body);
    }
}

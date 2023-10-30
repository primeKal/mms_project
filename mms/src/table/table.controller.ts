import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TableService } from './table.service';
import { TableModel } from './table.entity';
import { TableDto } from './dtos/table.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Table')
@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService){

    }
    @Get()
    public async getTable(): Promise<TableModel[]> {
      return this.tableService.getAllTables();
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
    public async createTable(@Body() body: TableDto): Promise<any> {
      return this.tableService.createTable(body);
    }

    @Put()
    public async editTable(@Body() body: TableDto): Promise<TableModel> {

      return this.tableService.editTable(body);
    }

    @Delete()
    public async deleteTable(@Body() id): Promise<void>{
      return this.tableService.deleteTable(id);
    }
}

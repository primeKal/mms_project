import { Inject, Injectable } from '@nestjs/common';
import { TABLE_REPOSITORY } from 'src/utils/constants';
import { TableModel } from './table.entity';

@Injectable()
export class TableService {
    constructor(@Inject(TABLE_REPOSITORY) private readonly tableRepository: typeof TableModel){     
    }
    async getAllTables(): Promise<TableModel[]> {
        return await this.tableRepository.findAll<TableModel>({
            //   include: [ProductCategory]
        });
    }
    async createTable(createTableModelDto): Promise<any> {
        let tableModel = await this.tableRepository.create<TableModel>(createTableModelDto);
        return tableModel;
    }
    async getOneTableById(id: number): Promise<TableModel> {
        return await this.tableRepository.findOne({
            where: {
                id: id
            },
            // include: [ProductCategory]
        })
    }
    async editTable(editTableModel: any): Promise<TableModel> {
        var toEditTableModel = await this.tableRepository.findByPk(editTableModel.id);
        try {
            return await toEditTableModel.update({ ...editTableModel })
        }
        catch (error) {
            console.log(error.errors)
            return error.message;
        }
    }
    async deleteTable(id: string): Promise<void> {
        var toDeleteTableModel = await this.tableRepository.findByPk(id);
        return await toDeleteTableModel.destroy();
    }
    async getTablesByCompany(companyId: any): Promise<any> {
        return this.tableRepository.findAll({
            where: { companyId: companyId },
        })
    }
}

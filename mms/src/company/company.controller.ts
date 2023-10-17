import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyDto } from './dtos/company.dto';

@Controller('Company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){
    }
    @Get()
    public async getCompany(): Promise<Company[]> {
      return this.companyService.getAllCompanys();
    }

    @Get(':id')
    public async getACompany(@Param('id') id: number): Promise<Company>{
      return this.companyService.getOneCompanyById(id);
    }

    @Post()
    public async createCompany(@Body() body: CompanyDto): Promise<any> {
      return this.companyService.createCompany(body);
    }

    @Put()
    public async editCompany(@Body() body: CompanyDto): Promise<Company> {

      return this.companyService.editCompany(body);
    }

    @Delete()
    public async deleteCompany(@Body() id): Promise<void>{
      return this.companyService.deleteCompany(id);
    }



}

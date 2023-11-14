import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CompanyDto } from './dtos/company.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';

@ApiTags('Company')
@Controller('Company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getCompany(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Company[]> {
      return this.companyService.getAllCompanies(page,pageSize);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getACompany(@Param('id') id: number): Promise<Company>{
      return this.companyService.getOneCompanyById(id);
    }

    @Post()
    public async createCompany(@Body() body: CompanyDto): Promise<any> {
      return this.companyService.createCompany(body);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    public async editCompany(@Body() body: CompanyDto): Promise<Company> {
      return this.companyService.editCompany(body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    public async deleteCompany(@Body() id): Promise<void>{
      return this.companyService.deleteCompany(id.id);
    }
}

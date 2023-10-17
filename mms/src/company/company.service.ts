import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPOSITORY } from 'src/utils/constants';
import { Company } from './company.entity';
import * as bcrypt from "bcrypt";
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CompanyService {
    constructor(
        @Inject(COMPANY_REPOSITORY) private readonly companyRepository: typeof Company,
        private authService : AuthService
    ){

    }
 
    async getAllCompanys(): Promise<Company[]> {
        return await this.companyRepository.findAll<Company>({
        //   include: { model: Socialmedia, as: 'socialmedias' }
        });
      }
      async createCompany(createCompanyDto): Promise<any> {
        createCompanyDto.password = await bcrypt.hash(createCompanyDto.password, 12);
        let company = await this.companyRepository.create<Company>(createCompanyDto);
        console.log(company)
        let data = this.authService.generateToken(company.dataValues)
        return data;
      }
      async createCompanyWithOutPW(createCompanyDto): Promise<Company> {
        return await this.companyRepository.create<Company>(createCompanyDto);
      }
      async getOneCompanyById(id:number): Promise<Company>{
        return await this.companyRepository.findOne( {
          where: {
            id: id
          }
        })
      }
      async editCompany(editCompany: any): Promise<Company> {
        var toEditCompany = await this.companyRepository.findByPk(editCompany.id);
        try{
          return await toEditCompany.update({...editCompany})
        }
        catch (error){
          console.log(error.errors)
          return error.message;
        } 
      }
      async deleteCompany(id: string): Promise<void>{
        var toDeleteCompany = await this.companyRepository.findByPk(id);
        return await toDeleteCompany.destroy();
      }    
}

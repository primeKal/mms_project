import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPOSITORY } from 'src/utils/constants';
import { Company } from './company.entity';
import * as bcrypt from "bcrypt";
import { AuthService } from 'src/auth/auth.service';
import { PaginationService } from 'src/utils/services/pagination.service';
import { Role } from 'src/role/role.entity';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly companyRepository: typeof Company,
    private authService: AuthService,
    private readonly paginationService: PaginationService<Company>,
    // @InjectBot() private bot: Telegraf
  ) {
    this.paginationService = new PaginationService<Company>(this.companyRepository);
    // this.bot.command('start', async (ctx: Context) => {
    //   const chatId = ctx.chat.id;
    //   console.log(chatId);
    //   console.log(ctx.from.username);
    //   let company = await this.findCompanyByTelegramUserName(ctx.from.username);
    //   if (!company){
    //     ctx.reply('Oops, we could not find your username in our database please.'); 
    //     ctx.reply('Steps To COnfigure:- go to your dashboard and add your telegram username.Finally come here and start the process again by deleting the bot');
    //   }
    //   else {
    //     let result = await this.updateCompanyWithTelegramChatId(chatId,company);
    //     result?ctx.reply('Nice, you will receive created orders here.Thank you'):ctx.reply('Oops, something went wrong');
    //   }
    // });

    
  }

  async getAllCompanies(page, pageSize): Promise<Company[]> {
    let exclude = { exclude: ['password'] }
    return await this.paginationService.findAll(page, pageSize)
  }

  async createCompany(createCompanyDto): Promise<any> {
    createCompanyDto.password = await bcrypt.hash(createCompanyDto.password, 12);
    let company = await this.companyRepository.create<Company>(createCompanyDto);
    company.$add("Role",  2)
    let data = this.authService.generateToken(company.dataValues)
    return data;
  }
  async createCompanyWithOutPW(createCompanyDto): Promise<Company> {
    return await this.companyRepository.create<Company>(createCompanyDto);
  }
  async getOneCompanyById(id: number): Promise<Company> {
    let company = await this.companyRepository.findOne({
      where: {
        id: id
      },
      include: [Role],
      attributes: { exclude: ['password'] },
    })
    return company
  }
  async editCompany(editCompany: any): Promise<Company> {
    var toEditCompany = await this.companyRepository.findByPk(editCompany.id);
    try {
      return await toEditCompany.update({ ...editCompany })
    }
    catch (error) {
      console.log(error.errors)
      return error.message;
    }
  }
  async deleteCompany(id: string): Promise<void> {
    var toDeleteCompany = await this.companyRepository.findByPk(id);
    return await toDeleteCompany.destroy();
  }

  async findUserByEmail(email: any): Promise<Company> {
    return this.companyRepository.findOne({
      where: { email: email },
    })
  }
  async saveCompanyPic(fileUrl: string, companyId: string): Promise<Company> {
    let company = await this.companyRepository.findByPk(companyId)
    let result = await company.update({
      imgUrl : fileUrl
    });
    return result;
  }
  async findCompanyByTelegramUserName(telegramUserName: any): Promise<Company> {
    return this.companyRepository.findOne({
      where: { telegramUserName: telegramUserName },
    })
  }
  async updateCompanyWithTelegramChatId(telegramChatId: any, company: Company): Promise<Company> {
    let result = await company.update({
       telegramChatId: telegramChatId
    })
    return company;
  }

}

import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { COMPANY_REPOSITORY } from 'src/utils/constants';
import { Company } from './company.entity';
import * as bcrypt from "bcrypt";
import { AuthService } from 'src/auth/auth.service';
import { PaginationService } from 'src/utils/services/pagination.service';
import { Role } from 'src/role/role.entity';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly companyRepository: typeof Company,
    private authService: AuthService,
    private readonly paginationService: PaginationService<Company>,
    private readonly mailService: MailerService,
    private readonly userService: UserService
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
    if (await this.checkCompanyExist(createCompanyDto.email)) {
      throw new UnprocessableEntityException("Company already exists");
    }

    // Create company first
    const company = await this.companyRepository.create<Company>(createCompanyDto);

    // Create admin user for the company
    const user = await this.userService.createUser({
      firstName: createCompanyDto.name.split(' ')[0] || createCompanyDto.name,
      lastName: createCompanyDto.name.split(' ').slice(1).join(' ') || '',
      email: createCompanyDto.email,
      username: createCompanyDto.username,
      password: createCompanyDto.password,
      companyId: company.id,
      roleIds: [2], // Admin role
      authType: 'LOCAL',
      phoneNumber: createCompanyDto.contact_information
    }, 0); // 0 as creatorId since this is initial setup

    // Generate token for the user
    const userWithCompany = await this.userService.findOne(user.id);
    const token = await this.authService.generateToken(userWithCompany);

    // Send welcome message
    await this.sendWelcomeMessage(company.email);

    return token;
  }

  async createCompanyWithOutPW(createCompanyDto): Promise<Company> {
    return await this.companyRepository.create<Company>(createCompanyDto);
  }
  async getOneCompanyById(id: number): Promise<Company> {
    let company = await this.companyRepository.findOne({
      where: {
        id: id,
        isActive: true
      },
      include: [User],
      attributes: { exclude: ['password'] },
    })
    return company
  }
  async editCompany(editCompany: any, id: any): Promise<Company> {
    var toEditCompany = await this.companyRepository.findByPk(id);
    try {
      console.log("this is the company", toEditCompany)
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
      imgUrl: fileUrl
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


  async checkCompanyExist(email: string): Promise<boolean> {
    const company = await this.companyRepository.findOne({
      where: { email: email },
    })
    console.log("this is cmpany", company)  
    if (company) {
      return true
    } else {
      return false
    }
  }
  async sendWelcomeMessage(email: string): Promise<void> {
    const message = `Thank you for registering with us. We are continuously trying to provide a more seemingness experience
    for you. If you have any questions or concerns, please feel free to reach out to us at with this email address.
    More updates are coming soon and we will get in touch with you.`;

    return this.mailService.sendMail({
      from: 'Kaleb Teshale <kalebteshale72@gmail.com',
      to: email,
      subject: `Welocme to Zues' Menues`,
      text: message,
    });
  }

}

import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CompanyDto } from './dtos/company.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MAX_PROFILE_PICTURE_SIZE_IN_BYTES } from 'src/utils/constants';
import { diskStorage } from 'multer';
import { multerOptionsCompanyImg } from 'multer.config';

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

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getACompany(@Param('id') id: number): Promise<Company>{
      return this.companyService.getOneCompanyById(id);
    }

  @UseInterceptors(
    FileInterceptor('company_img', multerOptionsCompanyImg))
    @Post()
    public async createCompany(@UploadedFile() company_img,@Body() body: CompanyDto): Promise<any> {
      // body.company_img = company_img.path;

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

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/companies',
        filename: (req: any, file: Express.Multer.File, cb): void => {
          const file_extension : string = file.originalname.split('.')[1]
          const newFileName = req.user.id + "_" + Date.now() + "." + file_extension
          cb(null, newFileName);
        }, 
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return cb(null, false);
        }
        return cb(null, true);
      }
    }))
    public async uploadFile(@UploadedFile(
      new ParseFilePipeBuilder()
        // .addFileTypeValidator({ fileType: 'image/jpeg' })
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) file: Express.Multer.File, @Body() id) {
      console.log("saved file updating model");
      let company = await this.companyService.saveCompanyPic(file.path, id.id)
      return company;
    }
}

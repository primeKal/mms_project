import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDto } from './dtos/product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MAX_PROFILE_PICTURE_SIZE_IN_BYTES } from 'src/utils/constants';
import { multerOptionsProductImg } from 'multer.config';

@UseGuards(JwtAuthGuard)
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get()
  public async getProducts(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Product[]> {
    return this.productService.getAllProducts(page, pageSize);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getAProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.getOneProductById(id);
  }

  @Get('ByCompany/:id')
  public async getProductByCompany(@Param('id') id: number): Promise<Product[]> {
    return this.productService.getProductsByCompany(id);
  }
  @Get('ByCategory/:id')
  public async getProductsByCategory(@Param('id') id: number): Promise<Product[]> {
    return this.productService.getProductsByCategory(id);
  }

  @Post()
  // @UseInterceptors(
  //   FileInterceptor('img', multerOptionsProductImg))
  public async createProduct(@UploadedFile() img, @Req() req: any, @Body() body: ProductDto): Promise<any> {
    // body.img = img.path;
    console.log("body", body);  
    return this.productService.createProduct(req.user.id, body);
  }

  @Put()
  public async editProduct(@Body() body: ProductDto): Promise<Product> {

    return this.productService.editProduct(body);
  }

  @Delete()
  public async deleteProduct(@Body() id): Promise<void> {
    return this.productService.deleteProduct(id.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/products',
      filename: (req: any, file: Express.Multer.File, cb): void => {
        console.log("jiiiiiiiiiiiiiii")
        const file_extension: string = file.originalname.split('.')[1]
        const newFileName = req.user.id + "_" + Date.now() + "." + file_extension
        cb(null, newFileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
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
  ) file: Express.Multer.File, @Req() req: any, @Body() productDto: ProductDto) {
    console.log("saved file updating model");
    console.log("am confused");
    let company = await this.productService.saveProductPic(file.path, productDto, req?.user?.id)
    return company;
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDto } from './dtos/product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';

@UseGuards(JwtAuthGuard)
@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){
    }
    
    @Get()
    public async getProducts(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Product[]> {
      return this.productService.getAllProducts(page, pageSize);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getAProduct(@Param('id') id: number): Promise<Product>{
      return this.productService.getOneProductById(id);
    }

    @Get('ByCompany/:id')
    public async getProductByCompany(@Param('id') id: number): Promise<Product[]>{
      return this.productService.getProductsByCompany(id);
    }
    @Get('ByCategory/:id')
    public async getProductsByCategory(@Param('id') id: number): Promise<Product[]>{
      return this.productService.getProductsByCategory(id);
    }

    @Post()
    public async createProduct(@Req() req: any, @Body() body: ProductDto): Promise<any> {
      return this.productService.createProduct(req.user.id,body);
    }

    @Put()
    public async editProduct(@Body() body: ProductDto): Promise<Product> {

      return this.productService.editProduct(body);
    }

    @Delete()
    public async deleteProduct(@Body() id): Promise<void>{
      return this.productService.deleteProduct(id.id);
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDto } from './dtos/product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){
    }
    
    @Get()
    public async getProducts(): Promise<Product[]> {
      return this.productService.getAllProducts();
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
    public async createProduct(@Body() body: ProductDto): Promise<any> {
      return this.productService.createProduct(body);
    }

    @Put()
    public async editProduct(@Body() body: ProductDto): Promise<Product> {

      return this.productService.editProduct(body);
    }

    @Delete()
    public async deleteProduct(@Body() id): Promise<void>{
      return this.productService.deleteProduct(id);
    }
}

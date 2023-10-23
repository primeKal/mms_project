import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './product.category.entity';
import { ProductCategoryDto } from './dtos/product.category.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Product Category')
@Controller('product-category')
export class ProductCategoryController {
    constructor(private readonly productCategoryService : ProductCategoryService){

    }

    @Get()
    public async getProductCategory(): Promise<ProductCategory[]> {
      return this.productCategoryService.getAllProductCategorys();
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getAProductCategory(@Param('id') id: number): Promise<ProductCategory>{
      return this.productCategoryService.getOneProductCategoryById(id);
    }

    @Get('ByCompany/:id')
    public async getProductCategoryByCompany(@Param('id') id: number): Promise<ProductCategory>{
      return this.productCategoryService.getProductCategorysByMenu(id);
    }

    @Post()
    public async createProductCategory(@Body() body: ProductCategoryDto): Promise<any> {
      return this.productCategoryService.createProductCategory(body);
    }

    @Put()
    public async editProductCategory(@Body() body: ProductCategoryDto): Promise<ProductCategory> {

      return this.productCategoryService.editProductCategory(body);
    }

    @Delete()
    public async deleteProductCategory(@Body() id): Promise<void>{
      return this.productCategoryService.deleteProductCategory(id);
    }
}

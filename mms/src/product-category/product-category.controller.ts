import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './product.category.entity';
import { ProductCategoryDto } from './dtos/product.category.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';


@UseGuards(JwtAuthGuard)
@ApiTags('Product Category')
@Controller('product-category')
export class ProductCategoryController {
    constructor(private readonly productCategoryService : ProductCategoryService){

    }

    @Get()
    public async getProductCategory(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<ProductCategory[]> {
      return this.productCategoryService.getAllProductCategories(page, pageSize);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async getAProductCategory(@Param('id') id: number): Promise<ProductCategory>{
      return this.productCategoryService.getOneProductCategoryById(id);
    }

    @Get('ByMenu/:id')
    public async getProductCategoryByCompany(@Param('id') id: number): Promise<ProductCategory[]>{
      return this.productCategoryService.getProductCategorysByMenu(id);
    }

    @Post()
    public async createProductCategory(@Req() req: any,@Body() body: ProductCategoryDto): Promise<any> {
      return this.productCategoryService.createProductCategory(body, req.user.id);
    }

    @Put()
    public async editProductCategory(@Body() body: ProductCategoryDto): Promise<ProductCategory> {

      return this.productCategoryService.editProductCategory(body);
    }

    @Delete()
    public async deleteProductCategory(@Body() id): Promise<void>{
      return this.productCategoryService.deleteProductCategory(id.id);
    }
}

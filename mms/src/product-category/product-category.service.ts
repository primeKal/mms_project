import { Inject, Injectable } from '@nestjs/common';
import { ProductCategory } from './product.category.entity';
import { PRODUCT_CATEGORY_REPOSITORY } from 'src/utils/constants';
import { Op } from 'sequelize';
import { ProductService } from 'src/product/product.service';
import { Product, ProductCategoryProduct } from 'src/product/product.entity';

@Injectable()
export class ProductCategoryService {
    constructor(@Inject(PRODUCT_CATEGORY_REPOSITORY) private readonly productCategoryRepository: typeof ProductCategory,
                private readonly productService: ProductService){

    }
    async getAllProductCategorys(): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.findAll<ProductCategory>({
            //   include: { model: Socialmedia, as: 'socialmedias' }
        });
    }
    async createProductCategory(createProductCategoryDto): Promise<any> {
        let products = await this.productService.getProductsByIds(createProductCategoryDto.productIds);
        delete createProductCategoryDto.productIds
        let productCategory = await this.productCategoryRepository.create<ProductCategory>(createProductCategoryDto);
        let flag = await productCategory.$set('products', products);
        console.log("hii flag",flag)
        return productCategory;
    }
    async getOneProductCategoryById(id: number): Promise<ProductCategory> {
        return await this.productCategoryRepository.findOne({
            where: {
                id: id
            },
            include: [Product]
        })
    }
    async editProductCategory(editProductCategory: any): Promise<ProductCategory> {
        var toEditProductCategory = await this.productCategoryRepository.findByPk(editProductCategory.id);
        try {
            return await toEditProductCategory.update({ ...editProductCategory })
        }
        catch (error) {
            console.log(error.errors)
            return error.message;
        }
    }
    async deleteProductCategory(id: string): Promise<void> {
        var toDeleteProductCategory = await this.productCategoryRepository.findByPk(id);
        return await toDeleteProductCategory.destroy();
    }
    async getProductCategorysByMenu(menuId: any): Promise<ProductCategory> {
        return this.productCategoryRepository.findOne({
            where: { menuId: menuId },
        })
    }
    async getCategoryByIds(ids:Array<number>) {
        return await this.productCategoryRepository.findAll({ where: { id: { [Op.in]: ids } }});
    }
    
}

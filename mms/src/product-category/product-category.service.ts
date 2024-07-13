import { Inject, Injectable } from '@nestjs/common';
import { ProductCategory } from './product.category.entity';
import { PRODUCT_CATEGORY_REPOSITORY } from 'src/utils/constants';
import { Op } from 'sequelize';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';
import { PaginationService } from 'src/utils/services/pagination.service';
import { addProductsToCategoryDto } from './dtos/add.products.category.dto';

@Injectable()
export class ProductCategoryService {
    constructor(@Inject(PRODUCT_CATEGORY_REPOSITORY) private readonly productCategoryRepository: typeof ProductCategory,
                // private readonly productService: ProductService,
                private readonly paginationService: PaginationService<ProductCategory>){
                    this.paginationService = new PaginationService<ProductCategory>(this.productCategoryRepository)
    }
    async getAllProductCategories(page, pageSize): Promise<ProductCategory[]> {
        return await this.paginationService.findAll(page, pageSize);
    }
    async createProductCategory(createProductCategoryDto, companyId): Promise<any> {
        createProductCategoryDto.companyId = companyId;
        let productCategory = await this.productCategoryRepository.create<ProductCategory>(createProductCategoryDto);
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
    async getProductCategoriesByMenu(menuId: any): Promise<ProductCategory[]> {
        return this.productCategoryRepository.findAll({
            where: { menuId: menuId },
        })
    }
    async getCategoryByIds(ids:Array<number>) {
        return await this.productCategoryRepository.findAll({ where: { id: { [Op.in]: ids } }});
    }

    async addProducts(addProductDto : addProductsToCategoryDto) {
        const productCategory = await this.productCategoryRepository.findOne( {
            where : {
                id : addProductDto.productCategoryId
            }
        });
        return productCategory.$add("Product",addProductDto.productIds);
    }
    async removeProducts(toRemoveProducts : addProductsToCategoryDto){
        const productCategory = await this.productCategoryRepository.findOne( {
            where : {
                id : toRemoveProducts.productCategoryId
            }
        });
        return productCategory.$remove("Product",toRemoveProducts.productIds);  
    }
    
}

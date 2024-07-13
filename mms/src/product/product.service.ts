import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { PRODUCT_REPOSITORY } from 'src/utils/constants';
import { Op } from 'sequelize';
import { PaginationService } from 'src/utils/services/pagination.service';
import { ProductDto } from './dtos/product.dto';
import { ProductCategoryService } from 'src/product-category/product-category.service';

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
        private readonly productCategoryService: ProductCategoryService,
        private readonly paginationService: PaginationService<Product>
    ) {
        this.paginationService = new PaginationService<Product>(this.productRepository)

    }
    async getAllProducts(page, pageSize): Promise<Product[]> {
        return await this.paginationService.findAll(page, pageSize)
    }
    async createProduct(companyId, createProductDto): Promise<any> {
        console.log(createProductDto)
        console.log(companyId)
        createProductDto.companyId = companyId as number;
        const product = await this.productRepository.create<Product>(createProductDto);
        if (product && createProductDto.productCategoryId) {
            await this.productCategoryService.addProducts({ productCategoryId: createProductDto.productCategoryId, productIds: [product.id] })
        }
        return product;
    }
    async getOneProductById(id: number): Promise<Product> {
        return await this.productRepository.findOne({
            where: {
                id: id
            }
        })
    }
    async editProduct(editProduct: any): Promise<Product> {
        var toEditProduct = await this.productRepository.findByPk(editProduct.id);
        try {
            return await toEditProduct.update({ ...editProduct })
        }
        catch (error) {
            console.log(error.errors)
            return error.message;
        }
    }
    async deleteProduct(id: string): Promise<void> {
        var toDeleteProduct = await this.productRepository.findByPk(id);
        return await toDeleteProduct.destroy();
    }
    async getProductsByCompany(companyId: any): Promise<Product[]> {
        return this.productRepository.findAll({
            where: { companyId: companyId },
        })
    }
    async getProductsByCategory(companyId: any): Promise<Product[]> {
        return this.productRepository.findAll({
            where: { companyId: companyId },
        })
    }
    async getProductsByIds(ids: Array<number>) {
        return await this.productRepository.findAll({ where: { id: { [Op.in]: ids } } });
    }
    async saveProductPic(fileUrl: string, productDto: ProductDto, companyId: Number): Promise<Product> {
        //check if product dto has id,
        console.log(fileUrl)
        console.log(productDto)
        let product = null
        if ((productDto.id)) {
            product = await this.productRepository.findByPk(productDto.id)
        } else {
            product = await this.createProduct(companyId, productDto)
        }
        let result = await product.update({
            imgUrl: fileUrl
        });
        return result;
    }
}

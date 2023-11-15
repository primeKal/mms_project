import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { PRODUCT_REPOSITORY } from 'src/utils/constants';
import { Op } from 'sequelize';
import { PaginationService } from 'src/utils/services/pagination.service';

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
        private readonly paginationService: PaginationService<Product>
    ) {
        this.paginationService = new PaginationService<Product>(this.productRepository)

    }
    async getAllProducts(page, pageSize): Promise<Product[]> {
        return await  this.paginationService.findAll(page,pageSize)
    }
    async createProduct(companyId,createProductDto): Promise<any> {
        createProductDto.companyId = companyId
        let product = await this.productRepository.create<Product>(createProductDto);
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
    async getProductsByIds(ids:Array<number>) {
        return await this.productRepository.findAll({ where: { id: { [Op.in]: ids } }});
    }
    async saveProductPic(fileUrl: string, companyId: string): Promise<Product> {
        let product = await this.productRepository.findByPk(companyId)
        let result = await product.update({
          imgUrl : fileUrl
        });
        return result;
      }
}

import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { PRODUCT_REPOSITORY } from 'src/utils/constants';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
    ) {

    }
    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.findAll<Product>({
            //   include: { model: Socialmedia, as: 'socialmedias' }
        });
    }
    async createProduct(createProductDto): Promise<any> {
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
    async getProductsByCompany(companyId: any): Promise<Product> {
        return this.productRepository.findOne({
            where: { companyId: companyId },
        })
    }
    async getProductsByIds(ids:Array<number>) {
        return await this.productRepository.findAll({ where: { id: { [Op.in]: ids } }});
    }
}

/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class ProductAPI {
    static createProduct(productInfo, companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('product', {
                    name: productInfo.name,
                    description: productInfo.description,
                    picture: 'not done yet',
                    price: productInfo.price,
                    productCategoryId: productInfo.productCategoryId,
                    companyId: companyId,
                })
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static getProducts() {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.get('product')
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default ProductAPI
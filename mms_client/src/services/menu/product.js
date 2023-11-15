/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class ProductAPI {
    static createProduct(productInfo) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('product', {
                    name: productInfo.name,
                    description: productInfo.description,
                    picture: productInfo.image,
                    price: productInfo.price,
                    productCategoryId: productInfo.productCategoryId,
                })
                resolve(response)
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
    static updateProduct(productInfo){
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.put('product', {
                    name: productInfo.name,
                    description: productInfo.description,
                    price: productInfo.price,
                    id: productInfo.id,
                    productCategoryId: productInfo.productCategoryId
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    static deleteProduct(productId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.delete('product', {
                    data: {
                        id: productId,
                    }
                })
                resolve(response)
            } catch (error) {
               reject(error)
            }
        })
    }
}
export default ProductAPI
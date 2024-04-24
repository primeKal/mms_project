/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class ProductAPI {
    static getAllProducts(companyId) {
        return new Promise(async(resolve, reject)=>{
            try {
                const response = await baseAPI.get(`Product/ByCompany/${companyId}`)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static createProduct(ProductInfo, companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('Product',{
                    name: ProductInfo.name,
                    size: ProductInfo.size,
                    number: ProductInfo.number,
                    status: ProductInfo.status,
                    companyId: companyId,
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    static updateProduct(ProductInfo) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.put('Product',{
                    name: ProductInfo.name,
                    size: ProductInfo.size,
                    number: ProductInfo.number,
                    status: ProductInfo.status,
                    id: ProductInfo.id
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    static deleteProduct(ProductId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.delete('Product', {
                    data: {
                        id: ProductId,
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
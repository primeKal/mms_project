/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class OrderAPI {
    static createOrder(orderInfo) {
        return new Promise(async(resolve, reject)=>{
            try {
                const response = await baseAPI.post('order', {
                    totalPrice: orderInfo.totalPrice,
                    totalTax: orderInfo.totalTax,
                    tableId: orderInfo.tableId,
                    customerPhone: orderInfo.customerPhone,
                    orderlines: orderInfo.orderlines,
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default OrderAPI
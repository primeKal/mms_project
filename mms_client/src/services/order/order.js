/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class OrderAPI {
    static getOrders() {
        return new Promise(async(resolve, reject)=>{
            try{
                const response = await baseAPI.get('order')
                const result = response.data
                resolve(result)
            }catch(error) {
                reject(error)
            }
        })
    }
    static editOrderStatus(status, orderId)  {
        return new Promise(async(resolve, reject)=>{
            try {
                const response = await baseAPI.put('order/UpdateStatus',{
                    id: orderId,
                    status: status
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default OrderAPI
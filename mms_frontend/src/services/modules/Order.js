/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class OrderAPI {
    static createOrder(orderInfo) {
        return new Promise(async(resolve, reject)=>{
            try {
                const response = await baseAPI.post('order', {
                    name: orderInfo.name,
                    userId: 1,
                    companyId: orderInfo.companyId,
                    totalPrice: orderInfo.totalPrice,
                    totalTax: orderInfo.totalTax,
                    tableId: orderInfo.tableId,
                    customerPhone: orderInfo.customerPhone,
                    orderlines: orderInfo.orderlines,
                });
                resolve(response);
            } catch (error) {
                reject(error)
            }
        });
    }
    static makePayment(orderId, paymentMethodId) {
        return new Promise(async(resolve, reject)=>{
            try {
                console.log("in last step", orderId, paymentMethodId)
                const response = await baseAPI.post('payment/generatePayment', {
                    orderId,
                    paymentMethodId,
                })
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }
    static getPaymentMethods() {
        return new Promise(async(resolve, reject)=> {
            try {
                const companyId = window.localStorage.getItem('companyId')
                const response = await baseAPI.get(`paymentMethod/ByCompanyActive/${companyId}`)
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default OrderAPI
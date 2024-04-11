/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class PaymentAPI {
    static getAllPayments(companyId) {
        return new Promise(async(resolve, reject)=>{
            try {
                const response = await baseAPI.get(`Payment/ByCompany/${companyId}`)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static createPayment(PaymentInfo, companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('Payment',{
                    name: PaymentInfo.name,
                    size: PaymentInfo.size,
                    number: PaymentInfo.number,
                    status: PaymentInfo.status,
                    companyId: companyId,
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    static updatePayment(PaymentInfo) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.put('Payment',{
                    name: PaymentInfo.name,
                    size: PaymentInfo.size,
                    number: PaymentInfo.number,
                    status: PaymentInfo.status,
                    id: PaymentInfo.id
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    static deletePayment(PaymentId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.delete('Payment', {
                    data: {
                        id: PaymentId,
                    }
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default PaymentAPI
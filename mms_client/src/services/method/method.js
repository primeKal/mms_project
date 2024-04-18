/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class MethodAPI {
    static getAllMethods(companyId) {
        return new Promise(async(resolve, reject)=>{
            try {
                const response = await baseAPI.get(`paymentMethod/ByCompany/${companyId}`)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static createMethod(MethodInfo) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('paymentMethod',{
                    name: MethodInfo.name,
                    type: MethodInfo.type,
                    status: MethodInfo.status == "ON"? true: false,
                    // parameters: MethodInfo.parameters,
                    parameters: "[]",
                    companyId: MethodInfo.companyId,
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    static updateMethod(MethodInfo) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.put('paymentMethod',{
                    name: MethodInfo.name,
                    size: MethodInfo.size,
                    number: MethodInfo.number,
                    status: MethodInfo.status,
                    id: MethodInfo.id
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    static deleteMethod(MethodId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.delete('paymentMethod', {
                    data: {
                        id: MethodId,
                    }
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default MethodAPI
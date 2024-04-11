/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class MethodAPI {
    static getAllMethods(companyId) {
        return new Promise(async(resolve, reject)=>{
            try {
                const response = await baseAPI.get(`Method/ByCompany/${companyId}`)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static createMethod(MethodInfo, companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('Method',{
                    name: MethodInfo.name,
                    size: MethodInfo.size,
                    number: MethodInfo.number,
                    status: MethodInfo.status,
                    companyId: companyId,
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
                const response = await baseAPI.put('Method',{
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
                const response = await baseAPI.delete('Method', {
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
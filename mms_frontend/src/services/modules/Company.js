/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class CompanyAPI {
    static getCompanyInfo(companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.get(`Company/${companyId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static getCompanyActiveMenu(companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.get(`menu/GetActivateMenuByCompany/${companyId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default CompanyAPI
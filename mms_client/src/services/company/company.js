/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class CompanyAPI {
    static getCompanyInfo() {
        return new Promise(async(resolve,reject)=>{
            try{
                const response = await baseAPI.get('company')
                const result = response.data
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    }
    static updateCompanyInfo(companyInfo) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.put('company', {
                    id: companyInfo.id,
                    primaryColor: companyInfo.primaryColor,
                    secondaryColor: companyInfo.secondaryColor,
                    specialFeatures: companyInfo.specialFeatures
                })
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default CompanyAPI
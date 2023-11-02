/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class MenuAPI {
    static getAllMenu(companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.get(`menu/ByCompany/${companyId}`)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static createMenu(menuInfo,companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('menu',{
                    name: menuInfo.name,
                    companyId: companyId,
                })
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    // static editMenu(menuInfo)
    // static deleteMenu()
}
export default MenuAPI
/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class MenuAPI {
    static getAllMenus(companyId) {
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
    static getMenuById(menuId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.get(`menu/${menuId}`)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static createMenu(menuInfo) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('menu',{
                    name: menuInfo.name,
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    // static editMenu(menuInfo)
    static deleteMenu(menuId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.delete(`delete/${menuId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default MenuAPI
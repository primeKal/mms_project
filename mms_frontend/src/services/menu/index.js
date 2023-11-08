/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class MenuAPI {
    static getMenuById(menuId) {
        return new Promise(async(resolve,reject)=>{
            try{
                const response = await baseAPI.get(`menu/${menuId}`)
                const result = response.data
                resolve(result)
            } catch(error) {
                reject(error)
            }
        })
    }
}
export default MenuAPI
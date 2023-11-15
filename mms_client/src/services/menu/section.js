/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class SectionAPI {
    static getMenuSection (menuId) {
        return new Promise(async(resolve,reject)=> {
            try {
                const response = await baseAPI.get(`product-category/ByMenu/${menuId}`)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static createSection(sectionInfo, menuId) {
        return new Promise(async(resolve,reject)=> {
            try {
                const response = await baseAPI.post('product-category', {
                    name: sectionInfo.name,
                    description: sectionInfo.description,
                    menuId: menuId,
                })
                resolve(response)
            }catch(error) {
                reject(error)
            }
        })        
    }
    static editSection(sectionInfo){
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.put('product-category',{
                    name: sectionInfo.name,
                    description: sectionInfo.description,
                    id: sectionInfo.id
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    static deleteSection(sectionId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.delete('product-category', {
                    data:{
                        id: sectionId,
                    }
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default SectionAPI
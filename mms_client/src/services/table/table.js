/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class TableAPI {
    static getTables(companyId) {
        return new Promise(async(resolve, reject)=>{
            try {
                const response = await baseAPI.get(`table/ByCompany/${companyId}`)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    static createTable(tableInfo, companyId) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('table',{
                    name: tableInfo.name,
                    size: tableInfo.size,
                    number: tableInfo.number,
                    status: tableInfo.status,
                    companyId: companyId,
                })
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default TableAPI
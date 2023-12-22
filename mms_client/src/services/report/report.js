/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class reportsAPI {
    static getOrdersByDate(date) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.get(`reports/getordersByDate/${date}`)
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        })
    }
    static getReport() {
        return new Promise(async(resolve,reject)=> {
            try {
                const response = await baseAPI.get('reports/reports')
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        })
    }
}
export default reportsAPI
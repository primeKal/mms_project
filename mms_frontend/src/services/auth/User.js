/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class UserAPI {
    // static login (credentials) {
    //     return new Promise(async(resolve,reject)=>{
    //         try {
    //             const response = await baseAPI.post('')
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }
    static signUp (restaurantInfo) {
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await baseAPI.post('company', {
                    name: restaurantInfo.name,
                    username: restaurantInfo.username,
                    email: restaurantInfo.email,
                    password: restaurantInfo.password
                })
                console.log(response)
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error.response)
            }
        })
    }
}
export default UserAPI
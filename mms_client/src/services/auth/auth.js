/* eslint-disable no-async-promise-executor */
import baseAPI from '../base'

class AuthAPI {
    static login(credentials) {
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await baseAPI.post('auth/login', {
                    email: credentials.email,
                    password: credentials.password
                })
                const result = response.data
                resolve(result)
            } catch (error) {
                reject(error.response)
            }
        })
    }
}
export default AuthAPI
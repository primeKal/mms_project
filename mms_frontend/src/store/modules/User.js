import UserAPI from '@/services/auth/User'
import { CREATE_SUCCESS_CODE } from '@/utils/Variables'
const state = {}
const getters = {}
const mutation = {
    
}
const actions = {
    register: async(companyInfo) =>{
        var status = null
        await UserAPI.signUp(companyInfo)
            .then((result)=>{
                if(result.status === CREATE_SUCCESS_CODE){
                    // save token
                }else{
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    }
}

export default {
    state,
    getters,
    mutation,
    actions,
    namespaced: true,
}
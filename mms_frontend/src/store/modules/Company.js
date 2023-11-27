import CompanyAPI from "@/services/modules/Company";
import { FETCH_SUCCESS_CODE } from "@/utils/Variables";

const state = {
    companyInfo: {},
    menu: {},
}
const getters = {
    getCompanyInfo: (state) =>{
        return state.companyInfo
    },
    getMenuInfo: (state) => {
        return state.menu
    },
}
const mutations = {
    setCompanyInfo: (state, companyInfo) => {
        state.companyInfo = companyInfo
    },
    setMenuInfo: (state, menuInfo) =>{
        state.menu = menuInfo
    },
}
const actions = {
    fetchCompanyInfo: async({commit}, companyId) => {
        var status = null
        await CompanyAPI.getCompanyInfo(companyId)
            .then((response)=>{
                if(response.status === FETCH_SUCCESS_CODE) {
                    commit('setCompanyInfo', response.data)
                    status = {'success': true}
                }else{
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    fetchMenu: async({commit}, companyId) =>{
        var status = null
        await CompanyAPI.getCompanyActiveMenu(companyId)
            .then((response)=>{
                if(response.status === FETCH_SUCCESS_CODE){
                    commit('setMenuInfo', response.data)
                    status = {'success': true}
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}
import MethodAPI from '@/services/method/method'
import { CREATE_SUCCESS, FETCH_SUCCESS } from '@/utils/Variables'
const state = {
    Methods: [],
    Method: {},
    MethodId: null,
}
const getters = {
    getAllMethods: (state) => {
        console.log(state.Methods)
        return state.Methods
    },
    getMethod: (state) => {
        return state.Method
    },
    getMethodId: (state) => {
        return state.MethodId
    }
}
const mutations = {
    setAllMethods: (state, Methods) => {
        state.Methods = Methods
    },
    setMethod: (state, Method) => {
        state.Method = Method
    },
    setMethodId: (state, MethodId)=>{
        state.MethodId = MethodId
    }
}
const actions = {
    fetchAllMethods: async({commit}, companyId) => {
        await MethodAPI.getAllMethods(companyId)
            .then((result)=>{
                commit('setAllMethods', result)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    fetchMethod: async({state,commit}, MethodId) => {
        state.Method = {}
        console.log(state.Method)
        await MethodAPI.getMethodById(MethodId)
            .then((result)=>{
                commit('setMethod', result)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    addNewMethod: async({dispatch}, MethodInfo) =>{
        var status = null
        await MethodAPI.createMethod(MethodInfo)
            .then(async (response)=>{
                if(response.status === CREATE_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchAllMethods', MethodInfo.companyId)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    updateMethod: async({state, dispatch}, MethodInfo) => {
        var status = null
        await MethodAPI.editMethod(MethodInfo)
            .then(async(result)=>{
                if(result.status === FETCH_SUCCESS) {
                    await dispatch('fetchMethod', state.MethodId)
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
    activateMethod: async({state, dispatch}, MethodId) =>{
        var status = null
        await MethodAPI.activateMethod(MethodId)
            .then(async (response)=>{
                if(response.status === FETCH_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchMethod', state.MethodId)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    removeMethod: async({state,dispatch}, MethodId) =>{
        var status = null
        await MethodAPI.deleteMethod(MethodId)
            .then(async (response)=>{
                if(response.status === FETCH_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchMethods', state.MethodId)
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
    namespaced: true,
}
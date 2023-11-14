import OrderAPI from "@/services/order/order";
import { CREATE_SUCCESS } from "@/utils/Variables";
const state = {
    orders: []
}
const getters = {
    getAllOrders: (state) => {
        return state.orders
    }
}
const mutations = {
    setOrders: (state, orders) => {
        state.orders = orders
    }
}
const actions = {
    fetchOrders: async({commit}) =>{
        await OrderAPI.getOrders()
            .then((result)=>{
                commit('setOrders', result)
            })
    },
    setOrderStatus: async({dispatch}, orderStatus)=>{
        var status = null
        await OrderAPI.editOrderStatus(orderStatus)
            .then(async (result)=>{
                if(result.status === CREATE_SUCCESS){
                    await dispatch('fetchOrders')
                    status = {'success': true}
                }else{
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status= {'success': false, 'error': error}
            })
        return status
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
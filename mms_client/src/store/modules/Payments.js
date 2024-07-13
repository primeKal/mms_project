import PaymentAPI from '@/services/payment/payment'
import { CREATE_SUCCESS, FETCH_SUCCESS } from '@/utils/Variables'
const state = {
    Payments: [],
    Payment: {},
    PaymentId: null,
}
const getters = {
    getAllPayments: (state) => {
        return state.Payments
    },
    getPayment: (state) => {
        return state.Payment
    },
    getPaymentId: (state) => {
        return state.PaymentId
    }
}
const mutations = {
    setAllPayments: (state, Payments) => {
        state.Payments = Payments
        console.log("paymrtndsf", state.Payments)
    },
    setPayment: (state, Payment) => {
        state.Payment = Payment
    },
    setPaymentId: (state, PaymentId)=>{
        state.PaymentId = PaymentId
    }
}
const actions = {
    fetchAllPayments: async({commit}, companyId) => {
        await PaymentAPI.getAllPayments(companyId)
            .then((result)=>{
                commit('setAllPayments', result)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    fetchPayment: async({state,commit}, PaymentId) => {
        state.Payment = {}
        console.log(state.Payment)
        await PaymentAPI.getPaymentById(PaymentId)
            .then((result)=>{
                commit('setPayment', result)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    addNewPayment: async({dispatch}, PaymentInfo) =>{
        var status = null
        await PaymentAPI.createPayment(PaymentInfo)
            .then(async (response)=>{
                if(response.status === CREATE_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchAllPayments', 1)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    updatePayment: async({state, dispatch}, PaymentInfo) => {
        var status = null
        await PaymentAPI.editPayment(PaymentInfo)
            .then(async(result)=>{
                if(result.status === FETCH_SUCCESS) {
                    await dispatch('fetchPayment', state.PaymentId)
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
    activatePayment: async({state, dispatch}, PaymentId) =>{
        var status = null
        await PaymentAPI.activatePayment(PaymentId)
            .then(async (response)=>{
                if(response.status === FETCH_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchPayment', state.PaymentId)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    removePayment: async({state,dispatch}, PaymentId) =>{
        var status = null
        await PaymentAPI.deletePayment(PaymentId)
            .then(async (response)=>{
                if(response.status === FETCH_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchPayments', state.PaymentId)
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
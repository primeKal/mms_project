import OrderAPI from "@/services/modules/Order";
import { CREATE_SUCCESS_CODE } from "@/utils/Variables";

const state = {
    orderInfo: {},
    cart: [],
}
const getters = {
    getOrderInfo: (state) => {
        return state.orderInfo
    },
    getCart: (state) => {
        const cs = localStorage.getItem('cart')
        if(!cs) {
            state.cart = []
        }
        else{
            state.cart = JSON.parse(cs)
        }
        return state.cart
    },
    getCartMetaData: (state) => {
        var totalPrice = 0
        var totalQuantity = 0
        state.cart.forEach((item)=>{
            totalPrice += (item.quantity * item.singlePrice)
            totalQuantity += item.quantity
        })
        return {
            totalPrice,
            totalQuantity,
        }
    }
}
const mutations = {
    addCartItem: (state, item) => {
        const cs = localStorage.getItem('cart')
        if(!cs) {
            state.cart.push(item)
        }else {
            const cart = JSON.parse(cs)
            const index = cart.findIndex(x => x.id === item.id)
            if(index > -1) {
                cart[index].quantity = item.quantity
            }else{
                cart.push(item)
            }
            state.cart = cart
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeItemFromCart: (state, itemId) =>{
        const cs = localStorage.getItem('cart')
        if(!cs) {
            state.cart = []
        }else{
            const cart = JSON.parse(cs)
            const index = cart.findIndex(x => x.id === itemId)
            if(index > -1){
                cart.splice(index,1)
            }
            state.cart = cart
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setCustomerPhone: (state, phoneNumber) =>{
        state.orderInfo['customerPhone'] = phoneNumber
    }
}
const actions = {
    createOrder: async({state,dispatch},phoneNumber, productlines) =>{
        var status = null
        dispatch('setOrderInfo', phoneNumber, productlines)
        await OrderAPI.createOrder(state.orderInfo)
            .then((response)=>{
                if(response.status === CREATE_SUCCESS_CODE) {
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
    setOrderInfo: ({state,getters}, phoneNumber, productlines) => {
        const order = {
            'tableId': parseInt(localStorage.getItem('tableId')),
            'customerPhone': phoneNumber,
            'orderlines': productlines,
            'totalPrice': getters.getCartMetaData.totalPrice
        }
        state.orderInfo = order
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
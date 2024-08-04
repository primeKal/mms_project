import OrderAPI from "@/services/modules/Order";
import { CREATE_SUCCESS_CODE } from "@/utils/Variables";

const state = {
    orderInfo: {},
    orderSuccessInfo: {},
    cart: [],
    paymentMethods: [],
}
const getters = {
    getOrderInfo: (state) => {
        return state.orderInfo
    },
    getCart: (state) => {
        console.log("getting cart");
        return state.cart;
    },
    // getCart: (state) => {
    //     console.log("getting cart")
    //     const cs = localStorage.getItem('cart')
    //     if(!cs) {
    //         state.cart = []
    //     }
    //     else{
    //         state.cart = JSON.parse(cs)
    //     }
    //     return state.cart
    // },
    getCartMetaData: (state) => {
        console.log("getting cart info");
        let totalPrice = 0;
        let totalQuantity = 0;
        state.cart.forEach((item) => {
            totalPrice += (item.quantity * item.price);
            totalQuantity += item.quantity;
        });
        const totalTax = totalPrice * 0.15;
        const grandTotal = totalPrice + totalTax;
        return {
            totalPrice,
            totalQuantity,
            grandTotal,
            totalTax,
        };
    },
    // getCartMetaData: (state) => {
    //     console.log("getting cart info")
    //     const cs = localStorage.getItem('cart');
    //     if(!cs) {
    //         state.cart = []
    //     } else {
    //         state.cart = JSON.parse(cs);
    //     }
    //     var totalPrice = 0
    //     var totalQuantity = 0
    //     state.cart.forEach((item)=>{
    //         totalPrice += (item.quantity * item.price)
    //         totalQuantity += item.quantity
    //     })
    //     const totalTax = totalPrice * 0.15;
    //     const grandTotal = totalPrice + totalTax;
    //     return {
    //         totalPrice,
    //         totalQuantity,
    //         grandTotal,
    //         totalTax,
    //     }
    // },
    getPaymentMethods: (state) => {
        return state.paymentMethods;
    },
    getOrder: (state) => {
        const order = localStorage.getItem('order')
        if(order) {
            state.orderSuccessInfo = JSON.parse(order);
        }
        return state.orderSuccessInfo;
    }
}
const mutations = {
    setCart(state, cart) {
        state.cart = cart;
    },
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
    setOrderSuccess: (state, orderInfo) => {
        state.orderSuccessInfo = orderInfo
        localStorage.setItem('order', JSON.stringify(orderInfo));
    },
    setCustomerPhone: (state, phoneNumber) =>{
        state.orderInfo['customerPhone'] = phoneNumber
    },
    setPaymentMethods: (state, paymentMethod) => {
        state.paymentMethods = paymentMethod;
    },
}
const actions = {
    loadCart({ commit }) {
        const cs = localStorage.getItem('cart');
        if (cs) {
            commit('setCart', JSON.parse(cs));
        } else {
            commit('setCart', []);
        }
    },
    createOrder: async({state, commit, dispatch},phoneNumber, productlines) =>{
        var status = null
        dispatch('setOrderInfo', phoneNumber, productlines)
        await OrderAPI.createOrder(state.orderInfo)
            .then((response)=>{
                if(response.status === CREATE_SUCCESS_CODE) {
                    commit('setOrderSuccess', response.data);
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
        let editedPhonenumber = '251'+phoneNumber;
        let orderMetaData = getters.getCartMetaData
        const order = {
            'name': 'test1',
            'companyId': parseInt(localStorage.getItem('companyId')),
            'tableId': parseInt(localStorage.getItem('tableId')),
            'customerPhone': editedPhonenumber,
            'orderlines': productlines,
            'totalPrice': orderMetaData.totalPrice,
            'totalTax': orderMetaData.totalTax,

        }
        state.orderInfo = order
    },
    makePayment: async ({state}, {orderId, paymentMethodId}) => {
        var status = null;
        console.log(state.orderInfo)
        console.log(orderId, paymentMethodId)
        await OrderAPI.makePayment(orderId, paymentMethodId)
            .then((result) => {
                if(result.status === CREATE_SUCCESS_CODE) {
                    status = {'success': true, payload: result.data}
                } else {
                    status = {'success': false}
                }
            })
            .catch((error)=> {
                status = {'success': false, 'error': error };
            })
        return status
    },
    fetchPaymentMethods: async ({commit}) => {
        await OrderAPI.getPaymentMethods()
            .then((result)=> {
                // let activePaymentMethods = result.map((method) => {
                //     return method.isActive == true;
                // })
                commit('setPaymentMethods', result);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
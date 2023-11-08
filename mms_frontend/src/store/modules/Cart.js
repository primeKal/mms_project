const state = {
    cart: [],
}
const getters = {
    getCart: (state) => {
        const cs = localStorage.getItem('cart')
        if(!cs){
            state.cart = []
        }else {
            state.cart = JSON.parse(cs)
        }
        return state.cart
    }
}
const mutations = {
    addToCart: (state, newItem) => {
        const cs = localStorage.getItem('cart')
        if(!cs) {
            state.cart = []
            state.cart.push(newItem)

        }else {
            state.cart = JSON.parse(cs)
            state.cart.map((cartItem)=>{
                if(cartItem.id === newItem.id) {
                    cartItem.quantity = newItem.quantity
                }else {
                    state.cart.push(newItem)
                }
            })
        }
        // set back to local storage
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart: (state, itemId) => {
        const cs = localStorage.getItem('cart')
        if(!cs) {
            state.cart = []
        }else{
            state.cart = JSON.parse(cs)
            state.cart.map((cartItem, index)=>{
                if(cartItem.id === itemId) {
                    state.cart.splice(index, 1)
                } 
            })
        }
        // set back to local storage
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart: (state) => {
        state.cart = []
        // set back to local storage
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }
}
const actions = {
    // sendCart: async({commit}) => {
    //     //api call
    // }
} 

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
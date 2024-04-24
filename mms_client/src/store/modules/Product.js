import ProductAPI from '@/services/product/product'
import { CREATE_SUCCESS, FETCH_SUCCESS } from '@/utils/Variables'
const state = {
    Products: [],
    Product: {},
    ProductId: null,
}
const getters = {
    getAllProducts: (state) => {
        return state.Products
    },
    getProduct: (state) => {
        return state.Product
    },
    getProductId: (state) => {
        return state.ProductId
    }
}
const mutations = {
    setAllProducts: (state, Products) => {
        state.Products = Products
    },
    setProduct: (state, Product) => {
        state.Product = Product
    },
    setProductId: (state, ProductId)=>{
        state.ProductId = ProductId
    }
}
const actions = {
    fetchAllProducts: async({commit}, companyId) => {
        await ProductAPI.getAllProducts(companyId)
            .then((result)=>{
                commit('setAllProducts', result)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    fetchProduct: async({state,commit}, ProductId) => {
        state.Product = {}
        console.log(state.Product)
        await ProductAPI.getProductById(ProductId)
            .then((result)=>{
                commit('setProduct', result)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    addNewProduct: async({dispatch}, ProductInfo) =>{
        var status = null
        await ProductAPI.createProduct(ProductInfo)
            .then(async (response)=>{
                if(response.status === CREATE_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchAllProducts', 1)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    updateProduct: async({state, dispatch}, ProductInfo) => {
        var status = null
        await ProductAPI.editProduct(ProductInfo)
            .then(async(result)=>{
                if(result.status === FETCH_SUCCESS) {
                    await dispatch('fetchProduct', state.ProductId)
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
    activateProduct: async({state, dispatch}, ProductId) =>{
        var status = null
        await ProductAPI.activateProduct(ProductId)
            .then(async (response)=>{
                if(response.status === FETCH_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchProduct', state.ProductId)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    removeProduct: async({state,dispatch}, ProductId) =>{
        var status = null
        await ProductAPI.deleteProduct(ProductId)
            .then(async (response)=>{
                if(response.status === FETCH_SUCCESS) {
                    status = {'success': true}
                    await dispatch('fetchProducts', state.ProductId)
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
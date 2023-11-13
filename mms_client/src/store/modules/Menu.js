import MenuAPI from '@/services/menu/menu'
import SectionAPI from '@/services/menu/section'
import ProductAPI from '@/services/menu/product'
import { CREATE_SUCCESS } from '@/utils/Variables'
const state = {
    menus: [],
    menu: {},
    menuId: null,
}
const getters = {
    getAllMenus: (state) => {
        return state.menus
    },
    getMenu: (state) => {
        return state.menu
    },
    getMenuId: (state) => {
        return state.menuId
    }
}
const mutations = {
    setAllMenus: (state, menus) => {
        state.menus = menus
    },
    setMenu: (state, menu) => {
        state.menu = menu
    },
    setMenuId: (state, menuId)=>{
        state.menuId = menuId
    }
}
const actions = {
    fetchAllMenus: async({commit}, companyId) => {
        await MenuAPI.getAllMenus(companyId)
            .then((result)=>{
                commit('setAllMenus', result)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    fetchMenu: async({commit}, menuId) => {
        await MenuAPI.getMenuById(menuId)
            .then((result)=>{
                commit('setMenu', result)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    addNewMenu: async({dispatch}, menuInfo) =>{
        var status = null
        await MenuAPI.createMenu(menuInfo)
            .then((response)=>{
                if(response.status === CREATE_SUCCESS) {
                    status = {'success': true}
                    dispatch('fetchAllMenus', 1)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    removeMenu: async({dispatch}, menuId) =>{
        var status = null
        await MenuAPI.deleteMenu(menuId)
            .then((response)=>{
                if(response.status === CREATE_SUCCESS) {
                    status = {'success': true}
                    dispatch('fetchMenus', 1)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    createNewSection: async({state,dispatch}, sectionInfo) => {
        var status = null
        await SectionAPI.createSection(sectionInfo,state.menuId)
            .then((response)=>{
                if(response.status === CREATE_SUCCESS) {
                    status = {'success': true}
                    dispatch('fetchMenu', state.menuId)
                }else {
                    status = {'success': false}
                }
            })
            .catch((error)=>{
                status = {'success': false, 'error': error}
            })
        return status
    },
    createProduct: async ({state,dispatch}, productInfo) =>{
        var status = null
        await ProductAPI.createProduct(productInfo)
            .then((response)=>{
                if(response.status === CREATE_SUCCESS) {
                    status = {'success': true}
                    dispatch('fetchMenu', state.menuId)
                }else{
                    status= {'success': false}
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
    mutations,
    actions,
    namespaced: true,
}
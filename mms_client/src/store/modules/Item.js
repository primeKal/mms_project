import itemService from '@/services/item/item.service'
import { CREATE_SUCCESS, FETCH_SUCCESS } from '@/utils/Variables'

const state = {
    items: [],
    item: {},
    itemId: null,
}

const getters = {
    getAllItems: (state) => state.items,
    getItem: (state) => state.item,
    getItemId: (state) => state.itemId
}

const mutations = {
    setAllItems: (state, items) => {
        state.items = items
    },
    setItem: (state, item) => {
        state.item = item
    },
    setItemId: (state, itemId) => {
        state.itemId = itemId
    }
}

const actions = {
    fetchAllItems: async({commit}) => {
        try {
            const response = await itemService.getAllItems()
            commit('setAllItems', response.data)
        } catch (error) {
            console.error('Error fetching items:', error)
            return { success: false, error }
        }
    },
    fetchItem: async({commit}, itemId) => {
        try {
            const response = await itemService.getItemById(itemId)
            commit('setItem', response.data)
            return { success: true }
        } catch (error) {
            console.error('Error fetching item:', error)
            return { success: false, error }
        }
    },
    addNewItem: async({dispatch}, itemData) => {
        try {
            const response = await itemService.createItem(itemData)
            if (response.status === CREATE_SUCCESS) {
                await dispatch('fetchAllItems')
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error creating item:', error)
            return { success: false, error }
        }
    },
    updateItem: async({dispatch}, {id, itemData}) => {
        try {
            const response = await itemService.updateItem(id, itemData)
            if (response.status === FETCH_SUCCESS) {
                await dispatch('fetchAllItems')
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error updating item:', error)
            return { success: false, error }
        }
    },
    deleteItem: async({dispatch}, itemId) => {
        try {
            const response = await itemService.deleteItem(itemId)
            if (response.status === FETCH_SUCCESS) {
                await dispatch('fetchAllItems')
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error deleting item:', error)
            return { success: false, error }
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
} 
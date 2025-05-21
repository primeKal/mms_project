import inventoryService from '@/services/inventory/inventory.service'
import { FETCH_SUCCESS } from '@/utils/Variables'

const state = {
    inventories: [],
    inventory: {},
    inventoryId: null,
}

const getters = {
    getAllInventories: (state) => state.inventories,
    getInventory: (state) => state.inventory,
    getInventoryId: (state) => state.inventoryId,
    getInventoryByItem: (state) => (itemId) => {
        return state.inventories.filter(inv => inv.itemId === itemId)
    }
}

const mutations = {
    setAllInventories: (state, inventories) => {
        state.inventories = inventories
    },
    setInventory: (state, inventory) => {
        state.inventory = inventory
    },
    setInventoryId: (state, inventoryId) => {
        state.inventoryId = inventoryId
    }
}

const actions = {
    fetchAllInventories: async({commit}) => {
        try {
            const response = await inventoryService.getAllInventory()
            commit('setAllInventories', response.data)
            return { success: true }
        } catch (error) {
            console.error('Error fetching inventories:', error)
            return { success: false, error }
        }
    },
    fetchInventory: async({commit}, inventoryId) => {
        try {
            const response = await inventoryService.getInventoryById(inventoryId)
            commit('setInventory', response.data)
            return { success: true }
        } catch (error) {
            console.error('Error fetching inventory:', error)
            return { success: false, error }
        }
    },
    fetchInventoryByItem: async({commit}, itemId) => {
        try {
            const response = await inventoryService.getInventoryByItem(itemId)
            commit('setAllInventories', response.data)
            return { success: true }
        } catch (error) {
            console.error('Error fetching inventory by item:', error)
            return { success: false, error }
        }
    },
    updateInventoryStatus: async({dispatch}, {id, status}) => {
        try {
            const response = await inventoryService.updateInventoryStatus(id, status)
            if (response.status === FETCH_SUCCESS) {
                await dispatch('fetchAllInventories')
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error updating inventory status:', error)
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
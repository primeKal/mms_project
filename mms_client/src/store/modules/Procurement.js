import procurementService from '@/services/procurement/procurement.service'
import { CREATE_SUCCESS, FETCH_SUCCESS } from '@/utils/Variables'

const state = {
    procurements: [],
    procurement: {},
    procurementId: null,
}

const getters = {
    getAllProcurements: (state) => state.procurements,
    getProcurement: (state) => state.procurement,
    getProcurementId: (state) => state.procurementId,
    getPendingProcurements: (state) => {
        return state.procurements.filter(proc => proc.status === 'PENDING')
    },
    getApprovedProcurements: (state) => {
        return state.procurements.filter(proc => proc.status === 'APPROVED')
    }
}

const mutations = {
    setAllProcurements: (state, procurements) => {
        state.procurements = procurements
    },
    setProcurement: (state, procurement) => {
        state.procurement = procurement
    },
    setProcurementId: (state, procurementId) => {
        state.procurementId = procurementId
    }
}

const actions = {
    fetchAllProcurements: async({commit}) => {
        try {
            const response = await procurementService.getAllProcurements()
            commit('setAllProcurements', response.data)
            return { success: true }
        } catch (error) {
            console.error('Error fetching procurements:', error)
            return { success: false, error }
        }
    },
    fetchProcurement: async({commit}, procurementId) => {
        try {
            const response = await procurementService.getProcurementById(procurementId)
            commit('setProcurement', response.data)
            return { success: true }
        } catch (error) {
            console.error('Error fetching procurement:', error)
            return { success: false, error }
        }
    },
    createProcurement: async({dispatch}, procurementData) => {
        try {
            const response = await procurementService.createProcurement(procurementData)
            if (response.status === CREATE_SUCCESS) {
                await dispatch('fetchAllProcurements')
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error creating procurement:', error)
            return { success: false, error }
        }
    },
    updateProcurementStatus: async({dispatch}, {id, status, remarks}) => {
        try {
            const response = await procurementService.updateProcurementStatus(id, status, remarks)
            if (response.status === FETCH_SUCCESS) {
                await dispatch('fetchAllProcurements')
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error updating procurement status:', error)
            return { success: false, error }
        }
    },
    deleteProcurement: async({dispatch}, procurementId) => {
        try {
            const response = await procurementService.deleteProcurement(procurementId)
            if (response.status === FETCH_SUCCESS) {
                await dispatch('fetchAllProcurements')
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            console.error('Error deleting procurement:', error)
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
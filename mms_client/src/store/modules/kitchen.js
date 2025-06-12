import { kitchenService } from '@/services/kitchen';

export default {
  namespaced: true,
  state: {
    kitchens: [],
    loading: false,
    error: null,
    totalKitchens: 0,
    currentPage: 1,
    pageSize: 10
  },
  mutations: {
    SET_KITCHENS(state, kitchens) {
      state.kitchens = Array.isArray(kitchens) ? kitchens : [];
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_TOTAL_KITCHENS(state, total) {
      state.totalKitchens = total;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    ADD_KITCHEN(state, kitchen) {
      if (!Array.isArray(state.kitchens)) {
        state.kitchens = [];
      }
      state.kitchens.push(kitchen);
    },
    UPDATE_KITCHEN(state, updatedKitchen) {
      if (!Array.isArray(state.kitchens)) {
        state.kitchens = [];
      }
      const index = state.kitchens.findIndex(k => k.id === updatedKitchen.id);
      if (index !== -1) {
        state.kitchens.splice(index, 1, updatedKitchen);
      }
    }
  },
  actions: {
    async fetchKitchens({ commit }, { page = 1, pageSize = 10 } = {}) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        const response = await kitchenService.getAllKitchens(page, pageSize);
        commit('SET_KITCHENS', response.data);
        commit('SET_TOTAL_KITCHENS', response.total);
        commit('SET_CURRENT_PAGE', page);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to fetch kitchens');
        commit('SET_KITCHENS', []);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async createKitchen({ commit }, kitchenData) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        const kitchen = await kitchenService.createKitchen(kitchenData);
        commit('ADD_KITCHEN', kitchen);
        return kitchen;
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to create kitchen');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async addItemsToKitchen({ commit }, { kitchenId, items }) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        const updatedKitchen = await kitchenService.addItemsToKitchen(kitchenId, items);
        commit('UPDATE_KITCHEN', updatedKitchen);
        return updatedKitchen;
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to add items to kitchen');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    getKitchens: state => state.kitchens,
    isLoading: state => state.loading,
    getError: state => state.error,
    getTotalKitchens: state => state.totalKitchens,
    getCurrentPage: state => state.currentPage
  }
}; 
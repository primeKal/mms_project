import TableAPI from "@/services/table/table";
import { CREATE_SUCCESS, FETCH_SUCCESS } from "@/utils/Variables";
const state = {
  tables: [],
};
const getters = {
  getTables: (state) => {
    return state.tables;
  },
};
const mutations = {
  setTables: (state, tables) => {
    state.tables = tables;
  },
};
const actions = {
  fetchTables: async ({ commit }, companyId) => {
    await TableAPI.getTables(companyId)
      .then((result) => {
        if (result) {
          commit("setTables", result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addTable: async ({ dispatch }, tableInfo) => {
    var status = null;
    await TableAPI.createTable(tableInfo)
      .then(async (result) => {
        if (result.status === CREATE_SUCCESS) {
          await dispatch("fetchTables");
          status = { success: true };
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
  updateTable: async ({ dispatch }, tableInfo) => {
    var status = null;
    await TableAPI.updateTable(tableInfo)
      .then(async (result) => {
        if (result.status === FETCH_SUCCESS) {
          await dispatch("fetchTables");
          status = { success: true };
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
  deleteTable: async ({ dispatch }, tableId) => {
    var status = null;
    await TableAPI.deleteTable(parseInt(tableId))
      .then((response) => {
        if (response.status === FETCH_SUCCESS) {
          dispatch("fetchTables");
          status = { success: true };
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

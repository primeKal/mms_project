import MenuAPI from "@/services/menu/menu";
import SectionAPI from "@/services/menu/section";
import ProductAPI from "@/services/menu/product";
import { CREATE_SUCCESS, FETCH_SUCCESS } from "@/utils/Variables";
const state = {
  menus: [],
  menu: {},
  allProducts: [],
  menuId: null,
};
const getters = {
  getAllMenus: (state) => {
    return state.menus;
  },
  getMenu: (state) => {
    return state.menu;
  },
  getMenuId: (state) => {
    return state.menuId;
  },
  getAllProducts: (state) => {
    return state.allProducts;
  },
};
const mutations = {
  setAllMenus: (state, menus) => {
    state.menus = menus;
  },
  setMenu: (state, menu) => {
    state.menu = menu;
  },
  setMenuId: (state, menuId) => {
    state.menuId = menuId;
  },
  setAllProducts: (state, products) => {
    state.allProducts = products;
  },
};
const actions = {
  fetchAllMenus: async ({ commit }, companyId) => {
    await MenuAPI.getAllMenus(companyId)
      .then((result) => {
        commit("setAllMenus", result);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchMenu: async ({ state, commit }, menuId) => {
    state.menu = {};
    console.log(state.menu);
    await MenuAPI.getMenuById(menuId)
      .then((result) => {
        commit("setMenu", result);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchAllProducts: async ({ commit }, companyId) => {
    await ProductAPI.getProductsByCompanyId(companyId)
      .then((result) => {
        commit("setAllProducts", result);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addNewMenu: async ({ dispatch }, menuInfo) => {
    var status = null;
    await MenuAPI.createMenu(menuInfo)
      .then(async (response) => {
        if (response.status === CREATE_SUCCESS) {
          status = { success: true };
          await dispatch("fetchAllMenus", 1);
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
  updateMenu: async ({ state, dispatch }, menuInfo) => {
    var status = null;
    await MenuAPI.editMenu(menuInfo)
      .then(async (result) => {
        if (result.status === FETCH_SUCCESS) {
          await dispatch("fetchMenu", state.menuId);
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
  activateMenu: async ({ state, dispatch }, menuId) => {
    var status = null;
    await MenuAPI.activateMenu(menuId)
      .then(async (response) => {
        if (response.status === FETCH_SUCCESS) {
          status = { success: true };
          await dispatch("fetchMenu", state.menuId);
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
  removeMenu: async ({ state, dispatch }, menuId) => {
    var status = null;
    await MenuAPI.deleteMenu(menuId)
      .then(async (response) => {
        if (response.status === FETCH_SUCCESS) {
          status = { success: true };
          await dispatch("fetchMenus", state.menuId);
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
  createNewSection: async ({ state, dispatch }, sectionInfo) => {
    var status = null;
    await SectionAPI.createSection(sectionInfo, state.menuId)
      .then(async (response) => {
        if (response.status === CREATE_SUCCESS) {
          status = { success: true };
          await dispatch("fetchMenu", state.menuId);
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
  updateSection: async ({ state, dispatch }, sectionInfo) => {
    var status = null;
    await SectionAPI.editSection(sectionInfo)
      .then(async (result) => {
        if (result.status == FETCH_SUCCESS) {
          await dispatch("fetchMenu", state.menuId);
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
  removeSection: async ({ state, dispatch }, sectionId) => {
    var status = null;
    await SectionAPI.deleteSection(sectionId)
      .then(async (result) => {
        if (result.status === FETCH_SUCCESS) {
          await dispatch("fetchMenu", state.menuId);
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
  createProduct: async ({ state, dispatch }, productInfo) => {
    var status = null;
    await ProductAPI.createProduct(productInfo)
      .then(async (response) => {
        if (response.status === CREATE_SUCCESS) {
          status = { success: true };
          await dispatch("fetchMenu", state.menuId);
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
  createCategoryProduct: async ({ state, dispatch }, productInfo) => {
    console.log(state, productInfo);
    var status = null;

    await ProductAPI.createCategoryProduct(productInfo)
      .then(async (response) => {
        if (response.status === CREATE_SUCCESS) {
          status = { success: true };
          await dispatch("fetchMenu", state.menuId);
        } else {
          status = { success: false };
        }
      })
      .catch((error) => {
        status = { success: false, error: error };
      });
    return status;
  },
  updateProduct: async ({ state, dispatch }, productInfo) => {
    var status = null;
    await ProductAPI.updateProduct(productInfo)
      .then(async (result) => {
        if (result.status === FETCH_SUCCESS) {
          await dispatch("fetchMenu", state.menuId);
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
  removeProduct: async ({ state, dispatch }, productId) => {
    var status = null;
    await ProductAPI.deleteProduct(productId)
      .then(async (result) => {
        if (result.status === FETCH_SUCCESS) {
          await dispatch("fetchMenu", state.menuId);
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

import AuthAPI from "@/services/auth/auth";
import UserAPI from "@/services/user/user";
import RoleAPI from "@/services/role/role";
const state = {
  user: {
    id: null,
    name: "",
    email: "",
    company: {
      id: null,
      name: "",
      primaryColor: "#43AA84",
      secondaryColor: "#000000",
      // add other company fields as needed
    },
    // add other user fields as needed
  },
  isLoggedIn: false,
  companyUsers: [],
  roles: [],
};

const getters = {
  getUser: (state) => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location = "/";
    } else {
      let unfilteredUser = JSON.parse(user);
      if (!("id" in unfilteredUser)) {
        window.location = "/";
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
      }
    }
    return state.user;
  },
  getCompanyInfo: (state) => {
    return state.user.company;
  },
  getCompanyUsers: (state) => state.companyUsers,
  getRoles: (state) => state.roles,
};

const mutations = {
  setUser: (state, user) => {
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  setAuth: (state, token) => {
    state.isLoggedIn = true;
    window.localStorage.setItem("access_token", token);
  },
  logout: (state) => {
    state.isLoggedIn = false;
    state.user = {
      id: null,
      name: "",
      email: "",
      company: {},
    };
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  },
  setCompanyUsers: (state, users) => {
    state.companyUsers = users;
  },
  setRoles: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  login: async ({ commit }, credentials) => {
    let status = null;
    await AuthAPI.login(credentials)
      .then((response) => {
        if (response) {
          const { access_token, user } = response;
          commit("setUser", user);
          commit("setAuth", access_token);
          status = true;
        }
      })
      .catch((error) => {
        status = false;
        console.log(error);
      });
    return status;
  },
  logout: ({ commit }) => {
    commit("logout");
  },
  async fetchCompanyUsers({ commit }) {
    try {
      const response = await UserAPI.getUsersByCompany();
      commit("setCompanyUsers", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async updateUser({ dispatch }, { id, data }) {
    try {
      await UserAPI.updateUser(id, data);
      await dispatch('fetchCompanyUsers');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async createUser({ dispatch }, data) {
    try {
      await UserAPI.createUser(data);
      await dispatch('fetchCompanyUsers');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async fetchRoles({ commit }) {
    try {
      const response = await RoleAPI.getRoles();
      commit("setRoles", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  // Add more user-related actions as needed
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

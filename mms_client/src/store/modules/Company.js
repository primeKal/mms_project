import AuthAPI from "@/services/auth/auth";
import CompanyAPI from "@/services/company/company";
const state = {
  companyInfo: {
    primaryColor: "#43AA84",
    secondaryColor: "#000000",
  },
  account: {
    username: "",
    email: "",
    password: "",
  },
  isLoggedIn: false,
};
const getters = {
  getCompanyInfo: (state) => {
    return state.companyInfo;
  },
  getCompanyLogo: (state) => {
    return state.companyInfo.imgUrl;
  },
};
const mutations = {
  setCompanyInfo: (state, companyInfo) => {
    state.companyInfo = companyInfo;
  },
  setAuth: (state, credentials) => {
    state.isLoggedIn = true;
    window.localStorage.setItem("access_token", credentials);
  },
  setAccount: (state, account) => {
    state.isLoggedIn = true;
    state.account = account;
  },
};
const actions = {
  login: async ({ commit }, credentials) => {
    var status = null;
    await AuthAPI.login(credentials)
      .then((response) => {
        if (response) {
          const { token, ...companyInfo } = response;
          commit("setCompanyInfo", companyInfo);
          commit("setAuth", token);
          status = true;
        }
      })
      .catch((error) => {
        status = false;
        console.log(error);
      });
    return status;
  },

  createAccount: async ({ commit }, account) => {
    var status = null;
    try {
      await CompanyAPI.createAccount(account)
        .then((response) => {
          if (response) {
            commit("setAccount", response);
            console.log(response);
            status = true;
          }
        })
        .catch((error) => {
          status = false;
          console.log(error);
        });

      return status;
    } catch (error) {
      console.error("message: " + error);
      status = false;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

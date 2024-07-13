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
    const companyInfo = localStorage.getItem('company');
    if(!companyInfo) {
      window.location = "/";
    } else {
      let unfilteredCompanyInfo = JSON.parse(companyInfo);
      if (!('id' in unfilteredCompanyInfo)) {
        window.location = "/";
        localStorage.removeItem('company');
        localStorage.removeItem('access_token');
      }
    }
    return state.companyInfo;
  },
  getCompanyLogo: (state) => {
    return state.companyInfo.imgUrl;
  },
};
const mutations = {
  setCompanyInfo: (state, companyInfo) => {
    localStorage.setItem('company', JSON.stringify(companyInfo));
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
            const { token, ...companyInfo } = response;
            commit("setAccount", response.data);
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
    } catch (error) {
      console.error("message: " + error);
      status = false;
    }
  },

  updateCompany: async ({ commit }, company) => {
    var status = null;
    try {
      await CompanyAPI.updateCompanyInfo(company)
        .then((response) => {
          if (response) {
            console.log(response);
            const { ...companyInfo } = response;
            commit("setCompanyInfo", companyInfo);
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

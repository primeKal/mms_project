import AuthAPI from "@/services/auth/auth"
const state = {
    companyInfo: {
        primaryColor: '#43AA84',
        secondaryColor: '#000000'
    },
    isLoggedIn: false,
}
const getters = {
    getCompanyInfo: (state) => {
        return state.companyInfo
    },
    getCompanyLogo: (state) => {
        return state.companyInfo.imgUrl
    }
}
const mutations = {
    setCompanyInfo: (state, companyInfo) => {
        state.companyInfo = companyInfo
    },
    setAuth: (state, credentials) =>{
        state.isLoggedIn = true
        window.localStorage.setItem('access_token', credentials)
    }
}
const actions = {
    login: async({commit},credentials) =>{
        var status = null
        await AuthAPI.login(credentials)
            .then((response)=>{
                if(response){
                    const {token, ...companyInfo} = response
                    commit('setCompanyInfo', companyInfo)
                    commit('setAuth', token)
                    status = true
                }                
            })
            .catch((error)=>{
                status = false
                console.log(error)
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
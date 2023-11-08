const state = {
    menuName: '',
    sections: [],
}
const getters = {
    getSections: (state) => {
        return state.sections
    },
}
const mutations = {
    setMenuInfo: (state, menuInfo) => {
        state.menuName = 
        state.sections = menuInfo.productCategories
    },
}
const actions = {
    // fetchMenu: ({commit}, companyId) => {
    //     // fetch from api
    // }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
import TableAPI from "@/services/table/table"
const state = {
    tables: []
}
const getters = {
    getTables: (state) => {
        return state.tables
    }
}
const mutations = {
    setTables: (state, tables) => {
        state.tables = tables
    }
}
const actions = {
    fetchTables: async ({commit}) =>{
        await TableAPI.getTables(1)
            .then((result)=>{
                if(result){
                    commit('setTables', result)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    addTable: async ({dispatch}, tableInfo) => {
        var status = null
        await TableAPI.createTable(tableInfo)
            .then((result)=>{
                if(result){
                    console.log(result)
                    status = true
                }
                dispatch('fetchTables')
            })
            .catch((error)=>{
                console.log(error)
                status = false
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
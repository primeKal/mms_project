import reportsAPI from "@/services/report/report"
const state = {
    ordersByDate: [],
    reports: {
        getTotalSalesForPast30Days: [],
        getTotalSalesPerMonth: [],
    },
}
const getters = {
    getOrdersByDate: (state) => {
        return state.ordersByDate
    },
    getReports: (state) => {
        return state.reports
    },
    getTotalSalesPerMonth: (state) => {
        return {
            labels: state.reports.getTotalSalesPerMonth?.map((data)=> {
                return new Date(data.month).getMonth()
            }),
            datasets: [{
                label: 'Sales data on every month',
                data: state.reports.getTotalSalesPerMonth?.map((data)=> {
                    return parseInt(data.totalSales)
                }),
                fill: false,
                borderColor: 'rgb(42, 170, 138)',
                tension: 0.1,
            }],
        }
    },
    getTotalSales30Days: (state) => {
        return {
            labels: state.reports.getTotalSalesForPast30Days?.map((data)=>{
                return new Date(data.date).getDate()
            }),
            datasets: [{
                label: 'Sales in the past 30 days',
                data: state.reports.getTotalSalesForPast30Days?.map((data)=> {
                    return parseInt(data.totalSales)
                }),
                borderWidth: 1,
            }],
        }
    }
}
const mutations = {
    setOrdersByDate: (state, orders) => {
        state.ordersByDate = orders
    },
    setReport: (state, reports) => {
        state.reports = reports
    }
}
const actions = {
    fetchOrderByDate: async ({commit}, date) => {
        await reportsAPI.getOrdersByDate(date)
            .then((response)=>{
                if(response) {
                    commit('setOrdersByDate', response)
                }else{
                    commit('setOrdersByDate', [])
                }
            })
            .catch(()=>{
                commit('setOrdersByDate', [])
            })
    },
    fetchReports: async ({commit}) => {
        await reportsAPI.getReport()
            .then((response)=>{
                if(response) {
                    commit('setReport', response)
                }else{
                    commit('setReport', [])
                }
            })
            .catch(()=>{
                commit('setReport', [])
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}
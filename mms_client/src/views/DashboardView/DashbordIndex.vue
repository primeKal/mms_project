<template>
    <MainRendererVue :loading="loading">
        <div class="h-full bg-slate-100 xl:p-10 p-2">
            <div class="xl:flex flex-col xl:justify-between justify-auto">
                <div class="xl:w-1/2 w-full bg-white rounded-xl p-6 shadow-lg">
                    <p>Today</p>
                    <div class="xl:mt-4 mt-2 flex space-x-8">
                        <div class="xl:p-5 p-2 rounded-xl border xl:text-base text-sm">
                            <p class="text-black/60">Total Sales</p>
                            <p class="font-semibold mt-3">40900.00</p>
                        </div>
                        <div class="xl:p-5 p-2 rounded-xl border xl:text-base text-sm">
                            <p class="text-black/60">Total Orders</p>
                            <p class="font-semibold mt-3">34</p>
                        </div>
                    </div>
                </div>
                <div class="xl:w-1/3 w-full xl:mt-0 mt-4 bg-white rounded-xl p-6 shadow-lg">
                    <p>Top Menu Items:</p>
                    
                </div>
            </div>
            <div class="xl:mt-8 mt-4 bg-white rounded-xl p-6 shadow-lg">
                <p>Past 30 days sales activity</p>
                <SalesBargraphVue :graphData="past30DaysSales" />
            </div>
            <div class="xl:mt-8 mt-4 bg-white rounded-xl p-6 shadow-lg">
                <p>Per month sales data comparison</p>
                <PerMonthSalesLineChartVue :graphData="perMonthSales" />
            </div>
        </div>
    </MainRendererVue>    
</template>
<script>
import { mapGetters } from 'vuex'

import MainRendererVue from '@/layout/MainRenderer.vue'
import SalesBargraphVue from '@/components/graphs/SalesBargraph.vue'
import PerMonthSalesLineChartVue from '@/components/graphs/PerMonthSalesLineChart.vue'
export default {
    components: {
        MainRendererVue,
        SalesBargraphVue,
        PerMonthSalesLineChartVue,
    },
    data () {
        return {
            loading: true,
        }
    },
    computed: {
        ...mapGetters({
            report: 'Report/getReports',
            past30DaysSales: 'Report/getTotalSales30Days',
            perMonthSales: 'Report/getTotalSalesPerMonth',

        })
    },
    async mounted () {
        this.$emit('selectedNav', 1)
        await this.$store.dispatch('Report/fetchReports')
        this.loading = false
    }
}
</script>
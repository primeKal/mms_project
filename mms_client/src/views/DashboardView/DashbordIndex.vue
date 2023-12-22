<template>
    <MainRendererVue :loading="loading">
        <div class="h-full bg-slate-100 p-10">
            <div class="flex justify-between">
                <div class="w-1/2 bg-white rounded-xl p-6 shadow-lg">
                    <p>Today</p>
                    <div class="mt-4 flex space-x-8">
                        <div class="p-5 rounded-xl border">
                            <p class="text-black/60">Total Sales</p>
                            <p class="font-semibold mt-3">40900.00</p>
                        </div>
                        <div class="p-5 rounded-xl border">
                            <p class="text-black/60">Total Orders</p>
                            <p class="font-semibold mt-3">34</p>
                        </div>
                    </div>
                </div>
                <div class="w-1/3 bg-white rounded-xl p-6 shadow-lg">
                    <p>Top Menu Items:</p>
                    
                </div>
            </div>
            <div class="mt-8 bg-white rounded-xl p-6 shadow-lg">
                <p>Past 30 days sales activity</p>
                <SalesBargraphVue :graphData="past30DaysSales" />
            </div>
            <div class="mt-8 bg-white rounded-xl p-6 shadow-lg">
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
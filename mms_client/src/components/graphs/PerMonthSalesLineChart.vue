<template>
    <LineChart 
        :chartData="graphData"
    />
</template>
<script>
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
    name: 'PerMonthSalesChart',
    props: {
        graphData: Array,
    },
    components: { LineChart },
})
</script>
<template>
    <BarChart 
        :chartData="graphData"
    />
</template>
<script>
import { defineComponent } from 'vue';
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
    name: 'SalesBarGraph',
    props: {
        graphData: Array,
    },
    components: { BarChart },
})
</script>
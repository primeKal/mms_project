<template>
    <table class="w-full border-collapse">
        <tr class="grid grid-cols-8 bg-slate-50 border-y shadow-sm">
            <th class="py-2 pl-7 text-left text-sm text-black/60 font-nomral">Order No.</th>
            <th class="py-2 pl-4 text-left text-sm text-black/60 font-nomral">Table No.</th>
            <th class="py-2 pl-4 text-left text-sm text-black/60 font-nomral">Customer Name</th>
            <th class="py-2 pl-4 text-left text-sm text-black/60 font-nomral">Order Date</th>
            <th class="py-2 pl-4 text-left text-sm text-black/60 font-nomral">Order Time</th>
            <th class="py-2 pl-4 text-left text-sm text-black/60 font-nomral">Total Price</th>
            <th class="py-2 pl-4 text-left text-sm text-black/60 font-nomral">Status</th>
            <th class="py-2 pl-4 text-center text-sm text-black/60 font-nomral">Action</th>
        </tr>
        <tbody>            
           <OrderRowVue 
                v-for="order in orders"
                :key="order.id"
                :order="order"
            />
        </tbody>
    </table>
</template>
<script>
import OrderRowVue from './OrderRow.vue'
export default {
    props: {
        orders: Array,
    },
    components: {
        OrderRowVue
    },
}
</script>
<template>
    <tr class="grid grid-cols-8 hover:bg-slate-50/60 border-b transition-colors">
        <OrderConfirmationVue 
            v-if="orderStatus"
            :status="orderStatus"
            :order="order"
            @closeModal="orderStatus=null"
        />
        <td class="py-3 font-light flex items-center lg:text-base  text-xs">
            <svg @click="openDetail = !openDetail" :class="[openDetail ? 'rotate-180': 'rotate-0']" class="cursor-pointer mr-3 transition-transform duration-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"/></svg>
            {{ order.id }}
        </td>
        <td class="lg:pl-4 pl-2 py-3 font-light text-[12px] md:text-xs">{{ order?.table?.name }}</td>
        <td class="lg:pl-4 pl-2 font-light text-[12px] md:text-xs">{{ order.name }}</td>
        <td class="lg:pl-4 pl-2 font-light text-[12px] md:text-xs">{{ $filter.timeOnly(order.createdAt) }}</td>
        <td class="lg:pl-4 pl-2 font-light text-[12px] md:text-xs">{{ $filter.dateOnly(order.createdAt) }}</td>
        <td class="lg:pl-4 pl-2 font-light text-[12px] md:text-xs">{{ order.totalPrice }}</td>
        <td class="lg:pl-4 pl-2 font-light text-[12px] md:text-xs">{{ order.status }}</td>
        <td class="relative py-3 flex justify-center items-center">
            <svg @click="openActions = true" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"/></svg>
            <div v-if="openActions" v-click-outside="clickAway" class="absolute top-5 right-0 z-10 bg-white shadow-lg rounded-md flex flex-col space-y-1 divide-y text-sm">
                <p @click="orderStatus= 'Prepared'" class="pt-2 px-4 cursor-pointer hover:bg-slate-50">Prepared</p>
                <p @click="orderStatus= 'Closed'" class="pt-2 px-4 cursor-pointer hover:bg-slate-50">Close(Paid)</p>
                <p @click="orderStatus='Canceled'" class="pt-1 pb-2 px-4 cursor-pointer hover:bg-slate-50">Cancel</p>
            </div>
        </td>
        <transition
            enter-from-class="h-0"
            enter-to-class="h-auto"
            enter-active-class="transition-all"
            leave-from-class="h-auto"
            leave-to-class="h-0"
            leave-transiton="transition-all"
        > 
            <td v-if="openDetail" class="col-start-2 col-span-full m-3">
                <div class="col-span-full m-">
                    <!-- <p>Products ordered</p> -->
                </div>
                <div v-for="line in order.orderlines" :key="line.id" class="grid grid-cols-3 m-3">
                    <p>{{ line.product.name }}</p>
                    <p>x{{ line.quantity }}</p>
                    <p>{{ line.singlePrice }}</p>
                </div>
            </td>
        </transition>
    </tr>
</template>
<script>
import OrderConfirmationVue from '@/components/modals/OrderConfirmation.vue'
export default {
    props: {
        order: Object
    },
    components: {
        OrderConfirmationVue,
    },
    data () {
        return {
            openDetail: false,
            openActions: false,
            orderStatus: null
        }
    },
    methods: {
        clickAway () {
            this.openActions = false
        }
    }
}
</script>
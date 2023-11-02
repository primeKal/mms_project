<template>
     <div class="p-6 pr-12 w-full">
        <h3 class="text-primary font-medium text-xl">Orders</h3>
        <div class="mt-4 w-full flex items-start justify-between">
            <SearchBarVue 
                class="w-1/3"
                :placeholderString="'Search by order code'"
                @searchChanged="searchOrders"
            />
            <fieldset class="-mt-2 w-1/5 border rounded">
                <legend class="ml-3 text-xs px-1">Table No.</legend>
                <select class="w-full pt-1 pb-1 px-2 outline-none text-sm">
                    <option>All</option>
                    <option>001</option>
                </select>
            </fieldset>
            <fieldset class="-mt-2 w-1/5 border rounded">
                <legend class="ml-3 text-xs px-1">Status</legend>
                <select class="w-full pt-1 pb-1 px-2 outline-none text-sm">
                    <option>Ordered</option>
                    <option>Completed</option>
                    <option>Closed</option>
                </select>
            </fieldset>
            <div class="w-1/5">
               <VueDatePicker v-model="orderDate" placeholder="Today" date :enable-time-picker="false" /> 
            </div>
            
        </div>
    </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import SearchBarVue from '@/components/fields/SearchBar.vue' 
export default {
    components: {
        VueDatePicker,
        SearchBarVue,
    },
    data () {
        return {
            orderDate: null,
        }
    },
    methods: {
        searchOrders (searchString) {
            console.log(searchString)
        }
    },
    mounted () {
        this.$emit('selectedNav', 5)
    }
}
</script>
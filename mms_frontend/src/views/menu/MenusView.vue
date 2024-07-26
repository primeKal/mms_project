<template>
    <div class="relative w-full">
        <SubmitOrderVue 
            v-if="submitOrder"
            @orderSubmitted="orderSubmitted()"
            @closeModal="submitOrder = false"
        />
        <PaymentConfirmationVue v-if="orderComplete" />
        
        <p class="text-2xl font-medium">Menu</p>
        <div class="mt-2 flex items-stretch overflow-x-scroll qr-scrollbar py-1">
            <button
                v-for="section in menu.productCategories"
                :key="section.id"
                @click="selectedSection=section"
                :class="{'text-menu-primary border-menu-primary': selectedSection.id=== section.id}"
                class="outline-none px-2 pb-1 text-black/70 border-b-2 w-min"
            >
                {{ section.name }}
            </button>
        </div>
        <div class="py-2">
            <transition-group
                tag="div"
                class="flex flex-col w-full space-y-3"
            >
                <MenuItemVue 
                    v-for="menuItem in selectedSection.products"
                    :key="menuItem.id"
                    :menuItem="menuItem"
                />
            </transition-group>
        </div>
        <OrderSummaryVue 
            :key="orderSummaryKey" 
            @updateOrderSummary="orderSummaryKey = +1" 
            @submitOrder="submitOrder = true" 
            class="z-10 fixed bottom-0 inset-b-0 inset-x-0 shadow-lg" 
        />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import MenuItemVue from '@/components/menu/MenuItem.vue'
import OrderSummaryVue from './OrderSummary.vue'
import SubmitOrderVue from './SubmitOrder.vue'
import PaymentConfirmationVue from './PaymentConfirmation.vue'
export default {
    components: {
        MenuItemVue,
        OrderSummaryVue,
        SubmitOrderVue,
        PaymentConfirmationVue,
    },
    data () {
        return {
            selectedSection: {},
            submitOrder: false,
            orderComplete: false,
            orderSummaryKey: 1,
        }
    },
    computed: {
        ...mapGetters({
            menu: 'Company/getMenuInfo',
        })
    },
    methods: {
        orderSubmitted() {
            this.submitOrder = false;
            this.orderComplete=true;
            console.log('Order Submitted');
        }
    },
    async mounted () {
        this.$emit('loading', true)
        const companyId = this.$route.params.companyId
        const status = await this.$store.dispatch('Company/fetchMenu', companyId)
        if(status.success) {
            this.selectedSection = this.menu.productCategories[0]
            this.$emit('loading', false)
        }else{
            this.$router.replace('/')
        }
    }
}
</script>
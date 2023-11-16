<template>
    <div class="relative">
        <p>Menu</p>
        <div class="mt-2 flex overflow-x-scroll ">
            <button
                v-for="section in menu.productCategories"
                :key="section.id"
                @click="selectedSection=section"
                :class="{'text-primary border-primary': selectedSection.id=== section.id}"
                class="outline-none p-2 text-black/70 border-b w-max"
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
        <OrderSummaryVue class="absolute inset-b-0 inset-x-0 shadow-md" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import MenuItemVue from '@/components/menu/MenuItem.vue'
import OrderSummaryVue from './OrderSummary.vue'
export default {
    components: {
        MenuItemVue,
        OrderSummaryVue,
    },
    data () {
        return {
            selectedSection: {},
        }
    },
    computed: {
        ...mapGetters({
            menu: 'Company/getMenuInfo',
        })
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
<template>
    <MainRendererVue :loading="loading" class="mt-1 mb-10">
        <div class="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md max-w-md mx-auto">
        <div class="flex flex-col items-center justify-center mb-6">
            <!-- <img :src="companyInfo.logo" alt="Company Logo" class="w-24 h-24 rounded-full shadow-lg mb-4"> -->
            <img src="/images/mms_logo.png" alt="Company Logo" class="w-24 h-24 rounded-full shadow-lg mb-4">

            <h1 class="text-2xl font-bold text-gray-800">{{ companyInfo.name }}</h1>
            <p class="text-gray-600 italic">{{ companyInfo.story }}</p>
            <p class="text-gray-800 mt-2 font-semibold">{{ companyInfo.moto }}</p>
        </div>
        <router-view v-slot="{ Component }">
                <!-- enter all transitions -->
                <transition mode="out-in">
                    <component :is="Component" @loading="(value) => { loading = value }"></component>
                </transition>
            </router-view>
    </div>
        <!-- <div class="h-full p-3 flex flex-col">
            <img src="/images/menu_image.png" class="self-center h-32 w-32 object-cover object-center rounded-full" />
            <h2 class="text-center mt-2 text-menu-primary">{{ companyInfo?.name }}</h2>

        </div> -->
    </MainRendererVue>
</template>
<script>
import MainRendererVue from '@/layout/MainRenderer.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        MainRendererVue
    },
    data() {
        return {
            loading: true,
        }
    },
    mounted() {
        // get menu id from url
        this.$emit('select_nav', 1)
        console.log(this.basicInfo)
    },
    computed: {
        ...mapGetters({
            companyInfo: 'Company/getCompanyInfo'
        })
    },
    async beforeCreate() {
        const companyId = this.$route.params.companyId
        const tableId = this.$route.params.tableId
        console.log(`${companyId} , ${tableId}`)
        localStorage.setItem('tableId', tableId)
        localStorage.setItem('companyId', companyId);
        const status = await this.$store.dispatch('Company/fetchCompanyInfo', companyId)
        console.log(status);
        console.log(this.companyInfo)
        // console.log(this.$store.getters['Company/getCompanyInfo'])
        // if(status.success) {
        //     this.loading = false
        // document.documentElement.style.setProperty('--color-primary', this.$store.getters['Company/getCompanyInfo'].primaryColor || '255 69 61' )
        // document.documentElement.style.setProperty('--color-secondary', this.$store.getters['Company/getCompanyInfo'].secondaryColor || '22 28 40')

        // }else {
        //     // route to 404 not menu found
        //     this.$router.push('/')
        // }
        document.documentElement.style.setProperty('--color-primary', this.$store.getters['Company/getCompanyInfo']?.primaryColor || '255 69 61')
        document.documentElement.style.setProperty('--color-secondary', this.$store.getters['Company/getCompanyInfo']?.secondaryColor || '22 28 40')
        setTimeout(() => {
            this.loading = false
        }, 1300)
    }
}
</script>
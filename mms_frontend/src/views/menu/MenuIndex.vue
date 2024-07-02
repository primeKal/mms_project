<template>
    <MainRendererVue :loading="loading">
        <div class="h-full p-7 flex flex-col">
            <img src="/images/menu_image.png" class="self-center h-32 w-32 object-cover object-center rounded-full" />
            <h2 class="text-center mt-2 text-menu-primary">Sheraton Addis</h2>
            <router-view v-slot="{Component}">
                <!-- enter all transitions -->
                <transition 
                    mode="out-in"   
                >
                    <component :is="Component" @loading="(value)=> {loading=value}" ></component>
                </transition>
            </router-view>  
        </div>
    </MainRendererVue>    
</template>
<script>
import MainRendererVue from '@/layout/MainRenderer.vue'
export default {
    components: {
        MainRendererVue
    },
    data () {
        return {
            loading: true,
        }
    },
    mounted () {
        // get menu id from url
        this.$emit('select_nav', 1)
    },
    async beforeCreate() {
        const companyId = this.$route.params.companyId
        const tableId = this.$route.params.tableId
        console.log(`${companyId} , ${tableId}`)
        localStorage.setItem('tableId', tableId)
        localStorage.setItem('companyId', companyId);
        const status = await this.$store.dispatch('Company/fetchCompanyInfo', companyId)
        console.log(status);
        // if(status.success) {
        //     this.loading = false
        // document.documentElement.style.setProperty('--color-primary', this.$store.getters['Company/getCompanyInfo'].primaryColor || '255 69 61' )
        // document.documentElement.style.setProperty('--color-secondary', this.$store.getters['Company/getCompanyInfo'].secondaryColor || '22 28 40')

        // }else {
        //     // route to 404 not menu found
        //     this.$router.push('/')
        // }
        document.documentElement.style.setProperty('--color-primary', this.$store.getters['Company/getCompanyInfo']?.primaryColor || '255 69 61' )
        document.documentElement.style.setProperty('--color-secondary', this.$store.getters['Company/getCompanyInfo']?.secondaryColor || '22 28 40')
        setTimeout(()=>{
            this.loading = false
        }, 1300)
    }
}
</script>
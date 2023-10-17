<template>
    <div class="h-screen grid grid-cols-6 grid-flow-col">
       <NavBarVue :navKey="navKey" class="col-span-1 border-r-2" />
       <div class="h-full col-span-5">
        <div class="w-full h-[10%] bg-white shadow-md">
            
        </div>
            <router-view @selected-nav="select_nav" />
       </div>
        
    </div>
</template>
<script>
import NavBarVue from '@/components/common/NavBar.vue'
export default {
    components: {
        NavBarVue
    },
    data () {
        return {
            navKey: 2,
        }
    },
    methods: {
        select_nav(value){
            this.navKey = value
        }
    }
}
</script>
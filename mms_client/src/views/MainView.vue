<template>
    <div class="w-full min-h-screen flex lg:flex-row flex-col">
        <div :class="[collapse ? 'lg:basis-auto':'lg:basis-1/6']" class="shadow-lg">
            <NavBarVue 
                :navValue="navValue" 
                @collapse="(value)=> {collapse=value}" 
                class="w-full"
            />
        </div>
        

        <div :class="[collapse ? 'basis-full':'basis-5/6']" class="h-full">
            <div class="px-8 pt-2 flex flex-row-reverse bg-white h-9 shadow-lg z-10">
                <p>Profile</p>
            </div>
            <div>
                <router-view @selectedNav="selectNav"/>
            </div>
        </div>
    </div>
</template>
<script>
import NavBarVue from '@/layout/NavBar.vue'
export default {
    components: {
        NavBarVue,
    },
    data () {
        return {
            navValue: 1,
            collapse: false,
        }
    },
    methods: {
        selectNav (value) {
            this.navValue = value
        }
    }
}
</script>
<template>
    <div class="w-full min-h-screen flex justify-between">
        <div :class="[collapse ? 'basis-auto' : 'basis-1/6']" class="shadow-lg p-2 h-100 bg-warning overflow-y-hidden">
            <NavBarVue :navValue="navValue" @collapse="(value) => { collapse = value }" class="w-full" />
        </div>
        <div :class="[collapse ? 'basis-full' : 'basis-5/6 ']" class="max-h-screen w-full overflow-y-scroll ">
            <!-- <div class="relative w-full"> -->
            <div class="h-full relative">
                <div class="fixed-top p-3 flex flex-row-reverse bg-white shadow z-10 mb-2 border-l">
                    <p>Profile</p>
                </div>
                <div class="">
                    <router-view @selectedNav="selectNav" />
                </div>
                <!-- </div> -->
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
    data() {
        return {
            navValue: 1,
            collapse: false,
        }
    },
    methods: {
        selectNav(value) {
            this.navValue = value
        }
    }
}
</script>
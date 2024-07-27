<template>
    <div class="w-full min-h-screen flex lg:flex-row flex-col">
        <div :class="[collapse ? 'lg:basis-auto' : 'lg:basis-1/6']" class="shadow-lg">
            <NavBarVue :navValue="navValue" @collapse="(value) => { collapse = value }" class="w-full" />
        </div>
        <div :class="[collapse ? 'basis-full' : 'basis-5/6 ']" class="max-h-screen w-full overflow-y-scroll ">
            <!-- <div class="relative w-full"> -->
            <div class="h-full relative">
                <div class="fixed-top flex flex-row-reverse bg-white shadow z-10 mb-2 ">
                    <a :href="menusUrl" target="_blank" class="hidden md:block text-green-600 hover:text-green-400">
                        <div class="flex flex-row items-center">
                            Powered by Zeus Menu's
                            <img src="/zeus.png" alt="Logo" class="hidden md:block w-[100px] h-[100px] object-contain">

                        </div>
                    </a>
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
            menusUrl: process.env.VUE_APP_ZUES_MENUS_PUBLIC_URL
        }
    },
    methods: {
        selectNav(value) {
            this.navValue = value
        }
    }
}
</script>
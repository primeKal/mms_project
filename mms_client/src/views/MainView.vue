<template>
    <div class="grid grid-cols-6">
        <NavBarVue :navValue="navValue" class="col-span-1 min-h-screen shadow-lg"/>
        <div class="col-span-5 h-full">
            <div class="flex flex-row-reverse bg-white h-9 shadow-lg z-10">
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
        }
    },
    methods: {
        selectNav (value) {
            this.navValue = value
        }
    }
}
</script>
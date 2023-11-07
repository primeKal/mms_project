<template>
    <div class="h-full p-7 flex flex-col bg-gradient-to-b from-emerald-100 to-emerald-200">
        <img src="/images/menu_image.png" class="self-center h-32 w-32 object-cover object-center rounded-full" />
        <h2 class="text-center mt-2 text-primary">Sheraton Addis</h2>
        <router-view v-slot="{Component}">
            <!-- enter all transitions -->
            <transition 
                mode="out-in"   
            >
                <component :is="Component"></component>
            </transition>
        </router-view>  

    </div>
</template>
<script>
import { useRoute } from 'vue-router'
export default {
    setup () {
        const route = useRoute();
        console.log(route.query)
        // fetch menu information from API
    },
    mounted () {
        // get menu id from url
        this.$emit('select_nav', 1)
    }
}
</script>
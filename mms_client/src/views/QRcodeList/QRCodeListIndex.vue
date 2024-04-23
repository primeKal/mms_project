<template>
   <MainRendererVue>
    <div class="p-6 pr-12 w-full">
        <h3 class="text-primary font-medium text-xl">QR Code Design List</h3>
        <div class="w-full flex justify-end">
            <button class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                + NEW QR CODE DESIGN
            </button>
        </div>
        <div class="w-full grid grid-cols-4 gap-10">

        </div>
    </div>
   </MainRendererVue>
</template>
<script>
import { mapGetters } from 'vuex'
import MainRendererVue from '@/layout/MainRenderer.vue';
export default {
    components: {
        MainRendererVue,
    },


}
</script>
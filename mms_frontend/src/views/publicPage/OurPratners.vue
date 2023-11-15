<template>
    <div class="py-20 px-24">
        <p class="text-center text-4xl font-medium">Restaurants working with us</p>
        <carousel class="w-full mt-16" :items-to-show="4.95" :wrapAround="true" :autoplay="3000" :transition="800" :pauseAutoplayOnHover="true" >
          <slide v-for="brand in brands" :key="brand">
            <img class="bg-transparent hover:scale-110" :src="brand" >
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
    </div>
</template>
<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
export default {
    components:{
    Carousel,
    Slide,
    Navigation

  },
    data () {
        return {
            brands: ['images/partners/mamas.png','images/partners/dok.png','images/partners/park_dale.png','images/partners/chanoly.png','images/partners/little_china.png','images/partners/mimis.png',]
        }
    }
}
</script>
<template>
    <section class="py-20 px-24 bg-slate-50">
        <p class="text-center">2,157 people have said how good QR Menu </p>
        <p class="mt-6 text-center font-medium text-4xl">Our happy clients said this about us</p>
        <carousel class="w-full mt-16 mb-10" :items-to-show="3" :wrapAround="true" :autoplay="3000" :transition="800" :pauseAutoplayOnHover="true" >
          <slide v-for="testimonial in testimonials" :key="testimonial.id" slideWidth="100px" >
            <div class="bg-white p-10">
                <div class="flex space-x-1 text-amber-400">
                    <svg v-for="n in 4" :key="n" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27Z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27V2Z"/></svg>
                </div>
                <p class="my-10 text-left">
                    "{{ testimonial.testimonial }}"
                </p>
                <p class="font-medium text-sm text-left">{{ testimonial.name }}</p>
                <p class="mt-2 text-sm text-black/70 text-left">{{ testimonial.position }}</p>
            </div>
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
        <div class="flex justify-center items-center">
            <p class="text-center text-sm font-medium text-secondary px-2 hover:underline cursor-pointer w-max">Check all 1,000 reviews</p>
        </div>
        
    </section>
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
            testimonials: [
                {'id': 1, 'testimonial': 'Revolutionized our restaurant operations! The QR Code Ordering System is a must-have for any dining setablishment. Efficient, user-friendly, and essential for adapting to the digital age.', 'name': 'Frezer Zewdu', 'position': 'Head Chef'},
                {'id': 2, 'testimonial': 'Revolutionized our restaurant operations! The QR Code Ordering System is a must-have for any dining setablishment. Efficient, user-friendly, and essential for adapting to the digital age.', 'name': 'Frezer Zewdu', 'position': 'Head Chef'},
                {'id': 3, 'testimonial': 'Revolutionized our restaurant operations! The QR Code Ordering System is a must-have for any dining setablishment. Efficient, user-friendly, and essential for adapting to the digital age.', 'name': 'Frezer Zewdu', 'position': 'Head Chef'},
                {'id': 4, 'testimonial': 'Revolutionized our restaurant operations! The QR Code Ordering System is a must-have for any dining setablishment. Efficient, user-friendly, and essential for adapting to the digital age.', 'name': 'Frezer Zewdu', 'position': 'Head Chef'},
                {'id': 5, 'testimonial': 'Revolutionized our restaurant operations! The QR Code Ordering System is a must-have for any dining setablishment. Efficient, user-friendly, and essential for adapting to the digital age.', 'name': 'Frezer Zewdu', 'position': 'Head Chef'},
            ]
        }
    }
}
</script>
<style scoped>
.carousel__slide {
  padding: 25px;
}
</style>
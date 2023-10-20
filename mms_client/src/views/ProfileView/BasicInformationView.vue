<template>
    <div class="p-6 pr-12 w-full">
       <div class="flex justify-between">
            <h3 class="text-primary font-medium text-xl">Our Story</h3>
            <EditButtonVue />
       </div>
       <p class="mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius mauris id sem pretium, id pellentesque risus facilisis. Sed mattis mattis commodo. Aliquam sagittis tempor massa sit amet venenatis. Sed convallis dictum mauris. Morbi tempor elementum erat, sit amet dapibus felis lacinia in. Aliquam imperdiet iaculis dolor non dignissim. Fusce lobortis justo scelerisque augue tempus, vitae dapibus risus consequat. In nec urna nibh. Maecenas efficitur neque massa, vitae aliquam nisi malesuada blandit. Etiam placerat pretium commodo.</p>
       <hr class="my-7 border w-full"/>
       <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Special features</h3>
            <EditButtonVue />
       </div>
       <p class="mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius mauris id sem pretium, id pellentesque risus facilisis. Sed mattis mattis commodo.</p>
       <hr class="my-7 border w-full"/>
       <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Contact</h3>
            <EditButtonVue />
       </div>
       <div class="w-full mt-5 flex">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Phone Number</label>
                <p class="mt-2 font-medium">+2519-65-34-4567</p>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Email Address</label>
                <p class="mt-2 font-medium">sheraton@gmail.com</p>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Website</label>
                <p class="mt-2 font-medium">www.sheraton.com</p>
            </div>
       </div>
       <hr class="my-7 border w-full"/>
       <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Address</h3>
            <EditButtonVue />
       </div>
    </div>
</template>
<script>
import EditButtonVue from '@/components/Buttons/EditButton.vue'
export default {
    components: {
        EditButtonVue,
    }
}
</script>
<template>
    <tr class="relative">
        <td class="pl-2">
            <svg @click="collapse = !collapse" :class="[collapse ? 'rotate-0' : 'rotate-180']" class="cursor-pointer transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"/></svg>
        </td>
        <td class="pl-4 py-3 font-light">{{ category.name }}</td>
        <td class="pl-2 py-3 font-light">{{ category.description }}</td>
        <td class="pl-4 py-3 flex items-center">
            <svg class="p-1 hover:border rounded hover:text-yellow-400 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"/></svg>
            <svg class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"/></svg>
        </td>        
    </tr>
    <transition
        enter-from-class="h-0"
        enter-to-class="h-auto"
        enter-active-class="transition-all"
        leave-from-class="h-auto"
        leave-to-class="h-0"
        leave-transiton="transition-all"
    >
        <tr v-if="!collapse" class="\w-full">
            <div class="px-4 flex flex-col w-full bg-white z-20">
                <div v-for="product in category.products" :key="product.id" class="flex justify-between w-full border-b py-1" >
                    <p class="basis-1/5 font-light">{{ product.name }}</p>
                    <p class="basis-1/4 font-light">{{ product.description }}</p>
                    <p class="basis-1/5 font-light">{{ $filter.formatPriceCurrency(product.price, 'ETB') }}</p>
                </div>            
            </div>
        </tr>
    </transition>
    
</template>
<script>
export default {
    props:{
        category: Array,
    },
    data () {
        return {
            collapse: true,
        }
    }
}
</script>
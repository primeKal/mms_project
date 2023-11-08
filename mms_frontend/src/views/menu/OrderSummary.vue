<template>
    <div class="h-full">
            <div v-if="!expand" class="w-full flex justify-between" >
                <div class="flex space-x-1">
                    <p>{{ totalOrderSize }} items</p>
                    <p>{{ $filters.formatPriceCurrency(totalOrder, 'ETB') }}</p>
                </div>
                <div class="flex space-x-2">
                    <button v-if="!expand" class="rounded py-1 px-3 bg-primary text-white">
                        SUBMIT
                    </button>
                    <svg @click="expand = !expand" :class="[expand ? 'rotate-0':'rotate-180']" class="transition-transform ease-in-out" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"/></svg>
                </div>
            </div>
            <transition
                enter-from-class="h-0"
                enter-to-class="h-1/2"
                enter-active-class="transition-transform duration-500 ease-in"
                leave-from-class="h-1/2"
                leave-to-class="h-0"
                leave-active-class="transition-transform duration-500 ease-out"
            >
                <div v-if="expand">
                    helo every body
                </div>
            </transition>
    </div>
</template>
<script>
export default {
    data () {
        return {
            expand: false,
            totalOrder: 270,
            totalOrderSize: 3, // fetch these from vuex
            cartItems: []
        }
    }
}
</script>
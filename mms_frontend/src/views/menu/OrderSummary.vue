<template>
    <div>
        <div class="shadow-lg p-3 w-full flex justify-between bg-white rounded-t-xl">
            <div class="flex space-x-1">
                <p>{{ cartInfo.totalQuantity }} items</p>
                <p class="font-medium">--- {{ $filters.formatPriceCurrency(cartInfo.totalPrice, 'ETB') }}</p>
            </div>
            <div class="flex space-x-2">
                <button v-if="!expand" @click="$emit('submitOrder')" class="rounded py-1 px-3 bg-primary text-white">
                    SUBMIT
                </button>
                <svg @click="expand = !expand" :class="[expand ? 'rotate-0' : 'rotate-180']"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z" />
                </svg>
            </div>
        </div>

        <div v-if="expand" class="min-h-[200px] p-2 inner-shadow overflow-y-auto scrollbar-hide bg-white">

            <MenuItem v-for="(item, index) in cart" :key="index" :menuItem="item" showCloseIcon />

            <p v-if="!cart.length" class="my-auto text-center text-black/50">No Items Yet</p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

import MenuItem from '@/components/menu/MenuItem.vue';
export default {
    components: {
        MenuItem
    },
    data() {
        return {
            expand: false,
        }
    },
    computed: {
        ...mapGetters({
            cart: 'Order/getCart',
            cartInfo: 'Order/getCartMetaData',
        }),
        orderedProducts() {
            return this.cart.length
        },
    },
}
</script>
<style>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>
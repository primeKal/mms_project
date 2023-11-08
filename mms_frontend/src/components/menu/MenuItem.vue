<template>
    <div class="h-28 w-full flex bg-[#F8F8FC] rounded-lg border overflow-hidden">
        <img :src="menuItem.image" class="w-1/3 object-cover object-center" />
        <div class="py-1 pl-3 flex flex-col">
            <div class="flex justify-between">
                <p class="text-lg">{{ menuItem.name }}</p>
                <svg v-if="showCloseIcon" @click="toogleCart(false)" class="cursor-pointer text-red-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46L13.46 12Z"/></svg>
            </div>
            <p class="mt-1 font-medium">{{ $filters.formatPriceCurrency(menuItem.price,'ETB') }}</p>
            <div class="mt-2 w-full flex justify-between">
                <div class="flex items-center">
                    <button @click="quantity > 1 ? quantity-=1 : quantity" class="py-1 px-2 text-primary border border-primary rounded-l shadow-sm">
                        <!-- minus icon svg -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H5v-2h14v2Z"/></svg>
                    </button>
                    <span class="px-2 shadow-inner text-primary">
                        {{ quantity }}
                    </span>
                    <button @click="quantity+=1" class="py-1 px-2 text-primary border border-primary rounded-r shadow-sm">
                        <!-- plus icon svg -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"/></svg>
                    </button>
                </div>
                <div class="ml-5">
                    <transition
                        mode="out-in"
                        enter-from-class="scale-0 rotate-180"
                        enter-to-class="scale-100 rotate-0"
                        enter-active-class="transition-transform duration-300 ease-in"
                        leave-from-class="scale-100 rotate-0"
                        leave-to-class="scale-0 rotate-180"
                        leave-active-class="transition-transform duration-300 ease-out"
                    >
                        <button @click="toogleCart(true)" v-if="!addedToCart" class="py-1 px-2 flex items-center rounded border border-primary text-primary font-medium active:scale-95">
                            <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M18 6H4.27l2.55 6H15c.33 0 .62-.16.8-.4l3-4c.13-.17.2-.38.2-.6a1 1 0 0 0-1-1m-3 7H6.87l-.77 1.56L6 15a1 1 0 0 0 1 1h11v1H7a2 2 0 0 1-2-2a2 2 0 0 1 .25-.97l.72-1.47L2.34 4H1V3h2l.85 2H18a2 2 0 0 1 2 2c0 .5-.17.92-.45 1.26l-2.91 3.89c-.36.51-.96.85-1.64.85Z"/></svg>
                            ADD
                        </button>
                        <button @click="toogleCart(false)" v-else class="py-1 px-5 flex rounded bg-primary text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><mask id="ipSCheckOne0"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44Z"/><path stroke="#000" stroke-linecap="round" d="m16 24l6 6l12-12"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"/></svg>
                        </button>
                    </transition>
                </div>                
            </div>           
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: {
        menuItem: Object,
        showCloseIcon: Boolean,
    },
    data () {
        return {
            quantity: 1,
            addedToCart: false
        }
    },
    methods: {
        ...mapActions({
            toogleCart: 'Cart/addToCart',
            removeFromCart: 'Cart/removeFromCart',
        }),
        toogleCart(direction) {
            if(direction) {
                // add to cart
                const order = {...this.menuItem}
                order['quantity'] = this.quantity
                this.toogleCart(order)
            }else {
                // remove from the cart
                this.removeFromCart(this.menuItem.id)
            }
            // change the button animation
            this.addedToCart = direction
        },
    }    
}
</script>
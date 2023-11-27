<template>
    <ModalLayoutVue>
        <div class="xl:w-1/4 w-11/12 pt-6 overflow-y-auto qr-scrollbar bg-white rounded-2xl">
            <p class="text-2xl px-4 font-semibold">Order Confirmation</p>
            <p class="px-4 mt-4 text-black/60">Products:</p>
            <div class="px-6 flex flex-col space-y-2 divide-y">
                <div v-for="product in cart" :key="product.id" class="pt-2 grid grid-cols-3">
                    <p class="font-light">{{ product.name }}</p>
                    <p class="font-light">x{{ product.quantity }}</p>
                    <p class="font-light">{{ $filters.formatPriceCurrency(product.quantity * product.price, 'ETB') }}</p>
                </div>
            </div>
            
            <p class="px-4 mt-3 text-right">
                Grand Total: <span class="font-semibold">{{ $filters.formatPriceCurrency(cartMetaData.totalPrice, 'ETB') }}</span>
            </p>
            <hr class="my-5 border-2 w-full"/>
            <p class="px-4 text-black/60">Please enter your phone number below</p>
            <div class="mt-2 px-4 flex">
                <div class="bg-menu-primary rounded-l-3xl px-3 py-2 text-white font-medium">
                    +251
                </div>
                <input class="py-1 pl-1 border rounded-r-3xl" placeholder="(7) 9-1111111" v-model="customerPhonenumber" />
            </div>
            <div class="mt-5 bg-gray-100 px-4 py-7 flex justify-end">
                <button @click="$emit('closeModal')" class="outline-none text-gray-500 hover:text-gray-600">Cancel</button>
                <button @click="submitOrder" class="ml-3 px-3 py-1 bg-menu-primary text-white active:scale-95 rounded font-semibold">Confirm</button>
            </div>
        </div>
    </ModalLayoutVue>
</template>
<script>
import ModalLayoutVue from '@/layout/ModalLayout.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        ModalLayoutVue,
    },
    data () {
        return {
            loading: false,
            customerPhonenumber: ''
        }
    },
    computed: {
        ...mapGetters({
            cart: 'Order/getCart',
            cartMetaData: 'Order/getCartMetaData',
        })
    },
    methods: {
        async submitOrder() {
            // validation for customer phone number needed
            this.loading = true
            const productlines = this.cart.map((product)=>{
                return {
                    'productId': product.id,
                    'quantity': product.quantity,
                    'currency': 'ETB',
                    'singlePrice': product.price,
                }
            })
            const status = await this.$store.dispatch('Order/createOrder', this.customerPhonenumber, productlines)
            if(status.success) {
                this.$emit('orderSubmitted')
            }else{
                // failure mekanism 
            }
        }
    }
}
</script>
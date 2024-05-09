<template>
    <ModalLayoutVue>
        <div class="px-2 xl:w-1/4 w-11/12 pt-6 overflow-y-auto qr-scrollbar bg-white rounded-2xl">
            <p class="text-2xl font-semibold">Pay</p>
            <div class="px-2 py-2 mt-4 w-full bg-slate-100 flex flex-col space-y-2 shadow rounded">
                <p>Order ID: <span class="font-semibold">{{ order.id }}</span></p>
                <p class=""> 
                    Grand Total: <span class="font-semibold">{{ $filters.formatPriceCurrency(order.totalPrice, 'ETB') }}</span>
                </p>
                
            </div>
           
            <p class="mt-3 px-3">Please select a payment method from the following:</p>
            <div class="px-4 py-2 mt-2 flex flex-col space-y-2 shadow-inner">
                <div class="cursor-pointer rounded-xl p12 font-semibold hover:shadow-md active:scale-95 transition-all" @click="selectPaymentMethod(paymentMethod.id)" v-for="paymentMethod in paymentMethods" :key="paymentMethod.id">
                    {{ paymentMethod.type }}
                </div>
            </div>
        </div>
    </ModalLayoutVue>
</template>
<script>
import ModalLayoutVue from '@/layout/ModalLayout.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        ModalLayoutVue,
    },
    computed: {
        ...mapGetters({
            paymentMethods: 'Order/getPaymentMethods',
            order: 'Order/getOrder',
        })
    },
    methods: {
        ...mapActions({
            generatePayment: 'Order/makePayment',
        }),
        async selectPaymentMethod(paymentMethodId) {
            const status = await this.generatePayment(this.order.id, paymentMethodId);
            if(status.success) {
                window.open(status.payload.url);
            }
        }
    },
}
</script>
<template>
    <ModalLayoutVue>
        <div class="w-[98%] md:w-1/2 p-12 bg-white rounded-lg shadow shadow-white">
            <p class="text-xl font-medium">{{ getModalTitle() }}</p>
            <div class="w-full mt-5 flex justify-between">
                <div class="w-1/2 flex flex-col space-y-2">
                    <div class="flex">
                        <label class="w-1/4 text-black/70">Order No.:</label>
                        <p>{{ order.name }}</p>
                    </div>
                    <div class="flex">
                        <label class="w-1/4 text-black/70">Table No.:</label>
                        <p class="w-1/4">{{ order.table?.name }}</p>
                    </div>
                </div>
                <div class="w-1/2 flex flex-col space-y-2">
                    <div class="flex">
                        <label class="w-1/3 text-black/70">Order Total:</label>
                        <p>{{ $filter.formatPriceCurrency(order.totalPrice, 'ETB') }}</p>
                    </div>
                    <div class="flex">
                        <label class="w-1/3 text-black/70">Date:</label>
                        <p>{{ order.createdAt }}</p>
                    </div>
                </div>
            </div>
            <div v-for="line in order.orderlines" :key="line.id"
                class="p-2 mt-5 grid grid-cols-3 gap-y-1 text-sm shadow-inner bg-slate-50">
                <p>{{ line.product.name }}</p>
                <p>x{{ line.quantity }}</p>
                <p>{{ line.singlePrice }}</p>
            </div>
            <div class="mt-5 flex justify-end">
                <button @click="$emit('closeModal')" class="text-gray-400 hover:text-gray-500 mr-3">Close</button>
                <button @click="changeOrderStatus()"
                    class="py-1 px-3 font-semibold text-white bg-green-400 hover:bg-green-500 active:scale-95 rounded">
                    <svg v-if="loading" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                            opacity=".5" />
                        <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                            <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite"
                                to="360 12 12" type="rotate" />
                        </path>
                    </svg>
                    <p>{{ getSubmitButtonTitle() }}</p>
                </button>
            </div>
        </div>
    </ModalLayoutVue>
</template>
<script>
import ModalLayoutVue from '@/layout/ModalLayout.vue'
export default {
    props: {
        status: String,
        order: Object,
    },
    components: {
        ModalLayoutVue,
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async changeOrderStatus() {
            this.loading = true
            const status = await this.$store.dispatch('Order/setOrderStatus', { orderStatus: this.status, orderId: this.order.id })
            if (status.success) {
                this.$toast.success(`Order ${this.order.id} changed to ${this.status}`)
                await this.$store.dispatch('Order/fetchOrders')
            } else {
                this.$toast.error('Status toggle failed')
            }
            this.$emit('closeModal')
            this.loading = false
        },
        getModalTitle() {
            console.log(this.order)
            if (this.status == "Closed") {
                return "Close Order"
            } else if (this.status == "Canceled") {
                return "Cancel Order"
            } else {
                return "Order is Prepared"
            }
        },
        getSubmitButtonTitle() {
            console.log(this.order)
            if (this.status == "Closed") {
                return "Close Order"
            } else if (this.status == "Canceled") {
                return "Cancel Order"
            } else {
                return "Update Order"
            }
        }
    }
}
</script>
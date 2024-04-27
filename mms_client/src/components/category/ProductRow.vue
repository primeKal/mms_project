<template>
    <DeleteConfirmationModalVue 
        v-if="openDelete"
        :title="openDelete.name"
        :id="openDelete.id"
        @deleteItem="deleteProduct"
        @closeModal="openDelete = null"
    />
    
    <div v-if="!editProduct" class="flex justify-between w-full py-1 pl-6">
        <p class="basis-auto">{{index+1}}</p>
        <!-- <img v-if="product.imgUrl" class="h-16 w-16 object-cover object-center" :src="product.imgUrl" />
        <img v-else class="h-16 w-16 object-cover object-center" :src="companyUrl" /> -->
        <p class="basis-1/5 text-black/60 font-medium">{{ product?.name }}</p>
        <p class="basis-1/5 font-light">{{ $filter.formatPriceCurrency(product?.price, 'ETB') }}</p>
        <div class="basis-1/4 flex items-center">
            <svg @click="editProduct=true" class="p-1 hover:border rounded hover:text-yellow-400 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"/></svg>
            <svg @click="openDelete=product" class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"/></svg>
        </div>
    </div>     
    <div v-else class="flex justify-between w-full py-1 pl-6">
        <p class="basis-auto">{{index+1}}</p>
        <!-- <img v-if="productInfo.imgUrl" class="h-16 w-16 object-cover object-center" :src="productInfo.imgUrl" /> -->
        <input class="basis-1/5 py-1 px-2 text-sm rounded border" v-model="productInfo.name" placeholder="Product Name" />
        <input class="basis-1/5 py-1 px-2 text-sm rounded border" type="number" v-model="productInfo.price" placeholder="Product Price"/>
        <td class="pl-1 py-2 flex justify-center items-center">
            <button @click="editProduct = false" class="py-1 px-4 text-gray-400 hover:text-gray-500 active:scale-95 transition-all font-semibold rounded">cancel</button>
            <button @click="updateProduct" class="py-1 px-4 text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all font-semibold rounded">Save</button>
        </td>
    </div>
</template>
<script>
import DeleteConfirmationModalVue from '../modals/DeleteConfirmationModal.vue'
export default {
    props: {
        product: Object,
        index: Number,
    },
    components: {
        DeleteConfirmationModalVue
    },
    data () {
        return {            
            editProduct: false,
            openDelete: null,
            productInfo: {},
        }
    },
    computed: {
        companyUrl() {
            return this.$store.getters['Company/getCompanyLogo']
        }
    },
    watch: {
        editProduct (value) {
            if(value) {
                this.productInfo = this.product
            }
        }
    },
    methods: {
        async updateProduct() {
            if(this.productInfo.name.length > 0 && this.productInfo.price > 0) {
                this.$emit('loading', true)
                const status = await this.$store.dispatch('Menu/updateProduct', this.productInfo)
                if(status.success) {
                    this.$toast.success('Product updated')
                    this.editProduct = false
                }else {
                    this.$toast.error('Error editing product')
                }
                this.$emit('loading', false)                
            }else{
                this.$toast.warning('Fill all the nessecary fields')
            }
        },
        async deleteProduct(id) {
            const status = await this.$store.dispatch('Menu/removeProduct', id)
            if(status.success) {
                this.$toast.success('Product deleted successfully')
            }else{
                this.$toast.error('Error deleting product')
            }
            setTimeout(()=>{
                this.openDelete = null
            }, 1000)
        }
    }
}
</script>
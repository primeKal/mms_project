<template>
    <div>
        <DeleteConfirmationModalVue 
            v-if="openDeleteCategory"
            :title="openDeleteCategory.name"
            :id="openDeleteCategory.id"
            @deleteItem="deleteSection"
            @closeModal="openDeleteCategory = null"
        />

        <table class="w-full border-collapse">
            <transition
                enter-from-class="h-0"
                enter-to-class="h-auto"
                enter-active-class="transition-all duration-500"
                leave-from-class="h-auto"
                leave-to-class="h-0"
                leave-active-class="transition-all duration-500"
            >
                <tr v-if="openNewCategory" class="grid grid-cols-3 bg-slate-100 px-4 py-2">
                    <p class="mb-1">Create new section:</p>
                    <div class="col-span-full w-full grid grid-cols-3 gap-4 bg-white p-3 rounded">
                        <input class="h-min w-full border rounded py-1 pl-2" placeholder="Section name" v-model="newCategory.name" />
                        <textarea style="resize:none;" class="h-20 rounded p-1 border" placeholder="Descripiton" v-model="newCategory.description" ></textarea>
                        <div class="flex justify-center items-center space-x-3 pl-4 py-1">
                            <button @click="createSection" class="py-1 px-4 text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all font-semibold rounded">Save</button>
                            <button @click="$emit('closeNewCategory')" class="py-1 px-4 text-white bg-gray-400 hover:bg-gray-500 active:scale-95 transition-all font-semibold rounded">cancel</button>
                        </div>
                    </div>
                </tr>
            </transition>

            <tr class="grid grid-cols-3 auto-cols-min bg-slate-50 border-y shadow-sm">
                <!-- <th class="px-1 justify-self-start">
                    
                </th> -->
                <th class="py-2 pl-4 text-left">Name</th>
                <th class="py-2 pl-2 text-left">Descripiton</th>
                <th class="py-2 pl-4 text-center">Action</th>
            </tr>
            <tbody>
                <template 
                    v-for="category in categories"
                    :key="category.id"
                    
                >
                    <tr 
                        :class="opened.includes(category.id) ? 'shadow-md bg-primary text-white': 'bg-white text-black shadow-none hover:bg-slate-50/60'" 
                        class="grid grid-cols-3 auto-cols-min justify-between border-b transition-colors"
                    >
                        <td class="pl-4 py-3 flex items-center font-light">
                            <svg class="mr-3" @click="toogle(category.id)" :class="[opened.includes(category.id) ? 'rotate-180' : 'rotate-0']"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"/></svg>
                            {{ category.name }}
                        </td>
                        <td class="pl-2 py-3 font-light">{{ category.description }}</td>
                        <td class="pl-4 py-3 flex justify-center items-center">
                            <svg class="p-1 hover:border rounded hover:text-yellow-400 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"/></svg>
                            <svg @click="openDeleteCategory=category" class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"/></svg>
                        </td>
                        <transition
                            enter-from-class="h-0"
                            enter-to-class="h-auto"
                            enter-active-class="transition-all"
                            leave-from-class="h-auto"
                            leave-to-class="h-0"
                            leave-transiton="transition-all"
                        > 
                            <td v-if="opened.includes(category.id)" class="col-span-full grid p-4 bg-slate-100 text-black shadow-inner">
                                <p class="mb-1">Products:</p>
                                <div class="pb-5 bg-white text-black rounded-lg">
                                    <div 
                                        v-for="(product,index) in category.products" :key="product.id" 
                                        class="flex justify-between w-full py-1 pl-6" 
                                    >
                                        <p class="basis-auto">{{index+1}}</p>
                                        <p class="basis-1/5 text-black/60 font-medium">{{ product.name }}</p>
                                        <p class="basis-1/5 font-light">{{ $filter.formatPriceCurrency(product.price, 'ETB') }}</p>
                                        <div class="basis-1/4 flex items-center">
                                            <svg class="p-1 hover:border rounded hover:text-yellow-400 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"/></svg>
                                            <svg class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"/></svg>
                                        </div>
                                    </div>
                                    <transition
                                        enter-from-class="scale-0"
                                        enter-to-class="scale-100"
                                        enter-active-class="transition-transform"
                                        leave-from-class="scale-100"
                                        leave-to-class="scale-0"
                                        leave-active-class="transition-transform"
                                        mode="out-in"
                                    >
                                        <div v-if="!openAddProduct" class="mt-3 w-full flex items-center justify-center">
                                            <hr class="border w-20" />
                                            <button @click="openAddProduct = true" class="mx-2 flex items-center text-black/70 hover:text-black">
                                                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7Z"/></svg>
                                                Add product
                                            </button>
                                            <hr class="border w-20" />
                                        </div>
                                        <div v-else class="flex border rounded shadow-md w-full py-2 px-10">
                                            <div class="" >
                                                <label v-if="!newProduct.image" for="image_upload" class="text-black/60" >
                                                        <!-- profile image with plus button svg -->
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M13 19c0 .7.13 1.37.35 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v8.35c-.63-.22-1.3-.35-2-.35V5H5v14h8m.96-6.71l-2.75 3.54l-1.96-2.36L6.5 17h6.85c.4-1.12 1.12-2.09 2.05-2.79l-1.44-1.92M20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3Z"/></svg>
                                                        <p class="text-xl ">Product Image</p>
                                                        <input @change="file_change" type="file" id="image_upload" style="display:none;" accept="image/*" />
                                                </label>
                                                <div v-else class="flex flex-col items-center" >
                                                    <img class=" h-[155px]" :src="newProduct.image"/>
                                                    <button @click="removeImage" class="mt-5 px-5 py-2  text-white hover:text-black font-semibold text-xl bg-transparent hover:bg-white border border-white rounded">
                                                            Remove
                                                    </button>
                                                </div>                 
                                            </div>
                                            <div class="ml-8 basis-2/5 flex flex-col space-y-2">
                                                <input class="py-1 pl-1  rounded border" placeholder="Product Name" v-model="newProduct.name" />
                                                <input class="py-1 pl-1 rounded border" placeholder="Product Price" type="number" v-model="newProduct.price" />
                                                <textarea style="resize:none;" class="p-1 rounded border h-20" placeholder="Description" v-model="newProduct.description" ></textarea>
                                                <div class="flex justify-end">
                                                    <button @click="openAddProduct = false" class="py-1 px-4 text-gray-400 bg-slate-50 hover:bg-gray-100 active:scale-95 transition-all font-semibold rounded">cancel</button>
                                                    <button @click="createProduct(category.id)" class="ml-3 py-1 px-4 text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all font-semibold rounded">Save</button>
                                                    
                                                </div>
                                            </div>                               
                                            
                                        </div>
                                    </transition>
                                    
                                </div>                                
                            </td>       
                        </transition>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
import DeleteConfirmationModalVue from '@/components/modals/DeleteConfirmationModal.vue'
export default {
    props: {
        categories: Array,
        openNewCategory: Boolean,
    },
    components: {
        DeleteConfirmationModalVue,
    },
    data () {
        return {
            opened: [],
            newCategory: {
                name: '',
                description: ''
            },
            newProduct: {
                name: '',
                price: '',
                description: '',
                image: null,
                productCategoryId: null,
            },
            file: null,
            openDeleteCategory: null,
            openAddProduct: false,
        }
    },
    methods: {
        toogle(id) {
            const index = this.opened.indexOf(id)
            if (index > -1) {
                this.opened.splice(index,1)
            }else{
                this.opened.push(id)
            }
        },
        file_change(e){
            this.file = e.target.files[0];
            this.newProduct.image = URL.createObjectURL(this.file);
        },
        removeImage(){

        },
        async createSection() {
            if(this.newCategory.name.length > 0) {
                this.$emit('loading', true)
                const status = await this.$store.dispatch('Menu/createNewSection', this.newCategory)
                if(status){
                    this.$toast.success('Section created successfully')
                    this.$emit('closeNewCategory')
                    this.newCategory.name = ''
                    this.newCategory.description = ''
                }else{
                    this.$toast.error('Error creating section')
                }
                this.$emit('loading', false)
            }            
        },
        async deleteSection (id) {
            if(this.newCategory) {
                this.$emit('loading', true)
                const status = await this.$store.dispatch('Menu/removeMenu', id)
                if(status.success){
                    this.$toast.success('Section deleted')
                    this.openDeleteCategory = null
                }else{
                    this.$toast.error('Error deleteing section')
                }
                this.$emit('loading', false)
            }
        },
        async createProduct(categoryId) {
           // insert validation
           this.$emit('loading', true)
           this.newProduct.productCategoryId = categoryId
           this.newProduct.image = this.file
           const status =  await this.$store.dispatch('Menu/createProduct', this.newProduct)
           if(status.success) {
                this.$toast.success('Product created successfully')
                this.openNewProduct = false
                this.newProduct.name = ''
                this.newProduct.price = ''
                this.newProduct.description = ''
                this.newProduct.image = null
           }else {
                this.$toast.error('Error occured creating product')
           }
           this.$emit('loading', false)
        }
    }
}
</script>
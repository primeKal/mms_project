<template>
    <MainRendererVue :loading="loading">
        <div class="lg:p-6 p-2 lg:pr-12 pr-2 w-full">
            <div class="flex lg:flex-row flex-col lg:justify-between">
                <button @click="$router.go(-1)"
                    class="lg:px-3 px-0 outline-none flex items-center hover:border rounded hover:shadow-sm">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                    BACK
                </button>
                <div class="lg:mt-0 mt-4 flex lg:space-x-5 space-x-2 lg:text-base text-sm">
                    <button @click="saveChanges"
                        class="px-3 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3zM6 6h9v4H6z" />
                        </svg>
                        SAVE CHANGES
                    </button>
                    <button
                        class="px-3 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2zm0 16H5V7h14v12zm-7-8.5c1.84 0 3.48.96 4.34 2.5c-.86 1.54-2.5 2.5-4.34 2.5s-3.48-.96-4.34-2.5c.86-1.54 2.5-2.5 4.34-2.5M12 9c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4zm0 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                        </svg>
                        PREVIEW
                    </button>
                    <button @click="togglePublish" :disable="menuInformation.isActive"
                        :class="[menuInformation.isActive ? 'text-gray-400 hover:bg-gray-400 border-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary border-primary']"
                        class="px-3 py-1 flex items-center bg-transparent hover:text-white  rounded border active:scale-95 transition-all">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M5 4h14v2H5zm0 10h4v6h6v-6h4l-7-7l-7 7zm8-2v6h-2v-6H9.83L12 9.83L14.17 12H13z" />
                        </svg>
                        <p v-if="!menuInformation.isActive">PUBLISH</p>
                        <p v-else>PUBLISHED</p>
                    </button>
                </div>
            </div>
            <h3 class="mt-10 text-primary font-medium text-xl">Menu Info</h3>
            <p class="lg:mt-3 mt-2 mb-5 text-black/50 text-sm">Edit name and number of your menu to be displayed.</p>
            <div class="w-full flex space-x-5">
                <fieldset class="lg:w-1/4 w-2/5 border rounded">
                    <legend class="ml-3 text-xs px-1">Menu Name</legend>
                    <input type="text" class="w-full pt-1 pb-1 px-2 outline-none" v-model="menuInformation.name" />
                </fieldset>
                <fieldset class="lg:w-1/4 w-2/5 border rounded">
                    <legend class="ml-3 text-xs px-1">Menu No.</legend>
                    <input type="text" class="w-full pt-1 pb-1 px-2 outline-none" v-model="menuInformation.id" />
                </fieldset>
            </div>
            <h3 class="mt-7 text-primary font-medium text-xl">Section</h3>
            <div class="mt-4 w-full flex justify-between">
                <SelectList :placeholderString="'Select category'" :selectedIndex="0" :options="allCategories"
                    @handleCreateNew="createNewCategory" @handleSelectedOption="handleSelectedOption" class="w-2/3" />
            </div>
            <h3 class="mt-7 text-primary font-medium text-xl">Product</h3>

            <div class="my-5 w-2/3">
                <AddProduct :categoryId="selectedCategory" :openAddProduct="true" />
            </div>

        </div>
        <!-- <CategoriesTableVue class="mt-4" :categories="menuInformation.productCategories"
                :openNewCategory="openNewCategory" @closeNewCategory="() => { openNewCategory = false }" @loading="(value) => {
                    loading = value
                }" /> -->
        <!-- <h3 class="mt-10 text-primary font-medium text-xl">Products list</h3>
            <div class="mt-4 w-full flex justify-between">
                <div class="flex justify-between w-3/5">
                    <SearchBarVue 
                        class="w-3/5"
                        :placeholderString="'Search products'"
                        @searchChanged="searchMenuItem"
                    />
                    <fieldset class="-mt-1 w-1/3 border rounded">
                        <legend class="ml-3 text-xs px-1">Section</legend>
                        <select class="w-full pt-1 pb-1 px-2 outline-none">
                            <option>Break fast</option>
                            <option>Fasting</option>
                        </select>
                    </fieldset>

                </div>
            <button class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                    + NEW PRODUCT
                </button>
            </div> -->
        <MenuListTableVue :menuItem="menus" class="mt-5" />

    </MainRendererVue>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import MainRendererVue from '@/layout/MainRenderer.vue'
// import CategoriesTableVue from './CategoriesTable.vue'
import SelectList from '@/components/fields/SelectList.vue'

// import SearchBarVue from '@/components/fields/SearchBar.vue'
import AddProduct from '@/components/category/AddProduct.vue'
import MenuListTableVue from './MenuListTable.vue'
export default {
    components: {
        MainRendererVue,
        // CategoriesTableVue,
        SelectList,
        // SearchBarVue,
        MenuListTableVue,
        AddProduct
    },
    data() {
        return {
            loading: true,
            openNewCategory: false,
            menuInformation: {},
            allCategories: [],
            selectedCategory: "",
            newProduct: {
                name: '',
                price: '',
                description: '',
                image: null,
                productCategoryId: null,
            },
            file: null,
        }
    },
    computed: {
        ...mapGetters({
            menuId: 'Menu/getMenuId',
            menus: 'Menu/getAllMenus',
            menu: 'Menu/getMenu',
        }),
    },
    watch: {
        menu: {
            deep: true,
            handler(value) {
                this.menuInformation = value
            }
        }
    },
    methods: {
        ...mapActions({
            updateMenu: 'Menu/updateMenu',
            activateMenu: 'Menu/activateMenu',
            getMenu: 'Menu/fetchMenu',
            getProducts: 'Menu/fetchAllProducts',
        }),
        toogleAdd(value) {
            this.$emit('update:openAddProduct', value)
        },
        file_change(e) {
            this.file = e.target.files[0];
            this.newProduct.image = URL.createObjectURL(this.file);
        },
        removeImage() {

        },
        initialization() {
            this.allCategories = this.menuInformation.productCategories;
            console.log(this.menus)
        },

        async createNewCategory(item) {
            console.log(item);
            // if(this.newCategory.name.length > 0) {
            this.$emit('loading', true)
            const status = await this.$store.dispatch('Menu/createNewSection', { name: item, description: '' })
            if (status) {
                this.$toast.success('Section created successfully')
                this.initialization();
                // this.$emit('closeNewCategory')
                // this.newCategory.name = ''
                // this.newCategory.description = ''
            } else {
                this.$toast.error('Error creating section')
            }
            this.$emit('loading', false)
            // } 
        },

        handleSelectedOption(index) {
            console.log(index);
            this.selectedCategory = index.id;
        },

        searchCategories(searchString) {
            console.log(searchString)
            // do the search
        },
        searchMenuItem(searchString) {
            console.log(searchString)
        },
        async saveChanges() {
            if (this.menuInformation.name.length > 0) {
                this.loading = true
                const status = await this.updateMenu(this.menuInformation)
                if (status.success) {
                    this.$toast.success('Changes saved successfully')
                } else {
                    this.$toast.error('Error saving changes')
                }
                this.loading = false
            }
        },
        async togglePublish() {
            this.loading = true
            const status = await this.activateMenu(this.menuInformation.id)
            if (status.success) {
                this.$toast.success(`Menu ${this.menuInformation.name} is now active`)
            } else {
                this.$toast.error('Error publishing menu')
            }
            this.loading = false
        }
    },
    async mounted() {
        if (!this.menuId) {
            this.$router.go(-1)
        }
        await this.getMenu(this.menuId)
        this.menuInformation = this.menu
        await this.getProducts()
        this.loading = false
        this.initialization()
    }
}
</script>
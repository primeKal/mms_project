<template>
    <div class="p-6 pr-12 w-full">
        <div class="flex justify-between">
            <button @click="$router.go(-1)" class="px-3 outline-none flex items-center hover:border rounded hover:shadow-sm">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/></svg>
                BACK
            </button>
            <div class="flex space-x-5">
                <button class="px-3 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3zM6 6h9v4H6z"/></svg>
                    SAVE CHANGES
                </button>
                <button class="px-3 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2zm0 16H5V7h14v12zm-7-8.5c1.84 0 3.48.96 4.34 2.5c-.86 1.54-2.5 2.5-4.34 2.5s-3.48-.96-4.34-2.5c.86-1.54 2.5-2.5 4.34-2.5M12 9c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4zm0 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
                    PREVIEW
                </button>
                <button class="px-3 py-1 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 4h14v2H5zm0 10h4v6h6v-6h4l-7-7l-7 7zm8-2v6h-2v-6H9.83L12 9.83L14.17 12H13z"/></svg>
                    PUBLISH
                </button>
            </div>
        </div>
        <h3 class="mt-10 text-primary font-medium text-xl">Menu Info</h3>
        <p class="mt-3 mb-5 text-black/50 text-sm">Edit name and number of your menu to be displayed.</p>
        <div class="w-full flex space-x-5">
            <fieldset class="w-1/4 border rounded">
                <legend class="ml-3 text-xs px-1">Menu Name</legend>
                <input type="text" class="w-full pt-1 pb-1 px-2 outline-none" />
            </fieldset>
            <fieldset class="w-1/4 border rounded">
                <legend class="ml-3 text-xs px-1">Menu No.</legend>
                <input type="text" class="w-full pt-1 pb-1 px-2 outline-none" />
            </fieldset>
        </div>
        <h3 class="mt-7 text-primary font-medium text-xl">Section</h3>
        <div class="mt-4 w-full flex justify-between">
           <SearchBarVue 
                class="w-2/3"
                :placeholderString="'Search sections'" 
                @searchChanged="searchCategories"
           />
            <button class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                + NEW SECTION
            </button>
        </div>
        <CategoriesTableVue class="mt-4" :categories="menuCategories"/>
        <h3 class="mt-10 text-primary font-medium text-xl">Products list</h3>
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
        </div>
        <MenuListTableVue class="mt-5" />
    </div>
</template>
<script>
import SearchBarVue from '@/components/fields/SearchBar.vue'
import CategoriesTableVue from './CategoriesTable.vue'
import MenuListTableVue from './MenuListTable.vue'
export default {
    components: {
        SearchBarVue,
        CategoriesTableVue,
        MenuListTableVue,
    },
    data () {
        return {
            menuCategories: [
                {'id': 1, 'name': 'Breakfast', 'description': 'Lorem ipsum dollar sit...'},
                {'id': 2, 'name': 'Fasting', 'description': 'Lorem ipsum dollar sit...'},
                {'id': 3, 'name': 'Non-fasting', 'description': 'Lorem ipsum dollar sit...'},
                {'id': 4, 'name': 'Drinks', 'description': 'Lorem ipsum dollar sit...'},
            ]
        }
    },
    methods: {
        searchCategories(searchString) {
            console.log(searchString)
            // do the search
        },
        searchMenuItem (searchString) {
            console.log(searchString)
        }
    }
}
</script>
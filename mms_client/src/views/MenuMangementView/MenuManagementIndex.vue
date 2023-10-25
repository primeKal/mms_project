<template>
    <div class="p-6 pr-12 w-full">
        <h3 class="text-primary font-medium text-xl">Category</h3>
        <div class="mt-4 w-full flex justify-between">
           <SearchBarVue 
                class="w-2/3"
                :placeholderString="'Search categories'" 
                @searchChanged="searchCategories"
           />
            <button class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                + NEW CATEGORY
            </button>
        </div>
        <CategoriesTableVue class="mt-4" :categories="menuCategories"/>
        <h3 class="mt-10 text-primary font-medium text-xl">Menu List</h3>
        <div class="mt-4 w-full flex justify-between">
            <div class="flex justify-between w-3/5">
                <SearchBarVue 
                    class="w-3/5"
                    :placeholderString="'Search menus'"
                    @searchChanged="searchMenuItem"
                />
                <fieldset class="-mt-1 w-1/3 border rounded">
                    <legend class="ml-3 text-xs px-1">Category</legend>
                    <select class="w-full pt-1 pb-1 px-2 outline-none">
                        <option>Break fast</option>
                        <option>Fasting</option>
                    </select>
                </fieldset>

            </div>
           <button class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                + NEW MENU
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
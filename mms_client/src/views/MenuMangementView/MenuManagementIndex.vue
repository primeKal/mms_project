<template>
    <div class="p-6 pr-12 w-full">
        <h3 class="text-primary font-medium text-xl">Category</h3>
        <div class="mt-4 w-full flex justify-between">
            <div class="relative h-min w-2/3 ">
                <input class="w-full py-2 pl-12 text-sm font-light border rounded" placeholder="Search Category" />
                <svg class="absolute left-4 top-2 text-black/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"/></svg>
            </div>
            <button class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                + NEW CATEGORY
            </button>
        </div>
        <CategoriesTableVue class="mt-4" :categories="menuCategories"/>
        <h3 class="mt-10 text-primary font-medium text-xl">Category</h3>
        <div class="mt-4 w-full flex justify-between">
            <div class="flex justify-between w-3/5">
                <div class="relative w-3/5">
                    <input class="w-full py-2 pl-12 text-sm font-light border rounded" placeholder="Search Category" />
                    <svg class="absolute left-4 top-2 text-black/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"/></svg>
                </div>
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
        
    </div>
</template>
<script>
import CategoriesTableVue from './CategoriesTable.vue'
export default {
    components: {
        CategoriesTableVue,
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
    }
}
</script>
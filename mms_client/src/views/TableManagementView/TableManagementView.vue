<template>
    <div class="p-6 pr-12 w-full">
        <h3 class="text-primary font-medium text-xl">Table</h3>
        <div class="mt-8 w-full flex justify-between">
            <div class="flex justify-between w-3/5">
                <SearchBarVue 
                    class="w-3/5"
                    :placeholderString="'Search by table number'"
                    @searchChanged="searchTables"
                />
                <fieldset class="-mt-1 w-1/3 border rounded">
                    <legend class="ml-3 text-xs px-1">Table Status</legend>
                    <select class="w-full pt-1 pb-1 px-2 outline-none">
                        <option>All</option>
                        <option>Free</option>
                        <option>Ocuppied</option>
                    </select>
                </fieldset>

            </div>
           <button class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                + NEW TABLE
            </button>
        </div>
        <TableListVue 
            class="mt-5"
            :tables="tables"
        />
    </div>
</template>
<script>
import SearchBarVue from '@/components/fields/SearchBar.vue';
import TableListVue from './TablesList.vue'
export default {
    components: {
        SearchBarVue,
        TableListVue,
    },
    data () {
        return {
            tables: [
                {'id': '001', 'size': 4, 'status': 'Occupied'}
            ]
        }
    },
    methods: {
        searchTables(searchString) {
            console.log(searchString)
        }
    }
}
</script>
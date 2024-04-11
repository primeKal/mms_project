<template>
    <MainRendererVue :loading="loading">
        <div class="p-6 pr-12 w-full">
            <AddTableViewVue class="z-10" v-if="addTable || editTable" :editTable="editTable"
                :isNew="editTable ? false : true" @closeModal="addTable = false, editTable = null" />

            <h3 class="text-primary font-medium text-xl">Table</h3>
            <div class="mt-8 w-full flex justify-between">
                <div class="flex justify-between w-3/5">
                    <SearchBarVue class="w-3/5" :placeholderString="'Search by table number'"
                        @searchChanged="searchTables" />
                    <fieldset class="-mt-1 w-1/3 border rounded">
                        <legend class="ml-3 text-xs px-1">Table Status</legend>
                        <select class="w-full pt-1 pb-1 px-2 outline-none">
                            <option>All</option>
                            <option>Free</option>
                            <option>Ocuppied</option>
                        </select>
                    </fieldset>

                </div>
                <button @click="addTable = true"
                    class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                    + NEW TABLE
                </button>
            </div>
            <TableListVue class="mt-5" :tables="tables" @editTable="(table) => { editTable = table }" />
        </div>
    </MainRendererVue>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import MainRendererVue from '@/layout/MainRenderer.vue';
import AddTableViewVue from './AddTableView.vue'
import SearchBarVue from '@/components/fields/SearchBar.vue';
import TableListVue from './TablesList.vue'

export default {
    components: {
        MainRendererVue,
        AddTableViewVue,
        SearchBarVue,
        TableListVue,
    },
    data() {
        return {
            loading: true,
            addTable: false,
            editTable: null,
            openDeleteTable: null,
        }
    },
    computed: {

        ...mapGetters({
            tables: 'Table/getTables',
            basicInfo: 'Company/getCompanyInfo',

        }),
    },
    methods: {
        ...mapActions({
            fetchTables: 'Table/fetchTables',
        }),

        async initialization() {
            await this.fetchTables(this.basicInfo.id)
        },

        searchTables(searchString) {
            console.log(searchString)
        },
    },
    async mounted() {
        this.$emit('selectedNav', 4)
        this.initialization();
        this.loading = false
    }
}
</script>
<template>
    <MainRendererVue :loading="loading">
        <div class="lg:p-6 p-2 lg:pr-12 pr-2 w-full">
            <AddTableViewVue 
                class="z-10" 
                v-if="addTable || editTable"
                :editTable="editTable"
                :isNew="editTable ? false : true" 
                @closeModal="addTable=false, editTable=null" 
            />

            <h3 class="text-primary font-medium text-xl">Table</h3>
            <div class="mt-8 w-full flex lg:flex-row flex-col lg:justify-between">
                <div class="flex justify-between lg:w-3/5 w-full">
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
                    class="lg:w-1/5 w-1/3 lg:mt-0 mt-3 lg:self-auto self-end bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
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
            basicInfo: 'User/getUser',

        }),
    },
    methods: {
        ...mapActions({
            fetchTables: 'Table/fetchTables',
        }),

        async initialization() {
            await this.fetchTables(this.basicInfo?.company?.id)
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
<template>
    <table class="w-full">
        <DeleteConfirmationModalVue 
            v-if="openDeleteTable"
            :title="openDeleteTable.name"
            :id="openDeleteTable.id"
            @deleteItem="deleteTable"
            @closeModal="openDeleteTable = null"
        />

        <thead class="bg-slate-50 border-y shadow-sm">
            <th class="py-2 pl-4 text-left">Table No.</th>
            <th class="py-2 pl-4 text-left">Size</th>
            <th class="py-2 pl-4 text-left">Table Status</th>
            <th class="py-2 pl-4 text-center">Action</th>
        </thead>
        <tbody>
            <tr
                v-for="table in tables"
                :key="table.id"
                class="hover:bg-slate-50/60 border-b transition-colors"
            >
            <td class="pl-4 py-3 font-light">{{ table.id }}</td>
            <td class="pl-4 py-3 font-light">{{ table.size }}</td>
            <td 
                class="pl-4 py-3 font-light"
                :class="[table.status === 'Open' ? 'text-green-500' : table.status === 'Occupied' ? 'text-amber-400' : 'text-red-500' ]"
            >
                {{ table.status }}
            </td>
            <td class="pl-4 py-3 flex justify-center items-center">
                <svg class="p-1 hover:border rounded hover:text-blue-400 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6.5A3.5 3.5 0 0 1 6.5 3h1.864a1 1 0 0 1 0 2H6.5A1.5 1.5 0 0 0 5 6.5v1.864a1 1 0 0 1-2 0V6.5ZM14.636 4a1 1 0 0 1 1-1H17.5A3.5 3.5 0 0 1 21 6.5v1.864a1 1 0 1 1-2 0V6.5A1.5 1.5 0 0 0 17.5 5h-1.864a1 1 0 0 1-1-1ZM4 14.636a1 1 0 0 1 1 1V17.5A1.5 1.5 0 0 0 6.5 19h1.864a1 1 0 1 1 0 2H6.5A3.5 3.5 0 0 1 3 17.5v-1.864a1 1 0 0 1 1-1Zm16 0a1 1 0 0 1 1 1V17.5a3.5 3.5 0 0 1-3.5 3.5h-1.864a1 1 0 1 1 0-2H17.5a1.5 1.5 0 0 0 1.5-1.5v-1.864a1 1 0 0 1 1-1ZM10 7H7v3h3v4H7v3h3v-3h4v3h3v-3h-3v-4h3V7h-3v3h-4V7Z"/></svg>
                <svg @click="$emit('editTable', table)" class="ml-3 p-1 hover:border rounded hover:text-yellow-400 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"/></svg>
                <svg @click="openDeleteTable = table" class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"/></svg>
            </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import DeleteConfirmationModalVue from '@/components/modals/DeleteConfirmationModal.vue';
export default {
    props: {
        tables: Array,
    },
    components:{
        DeleteConfirmationModalVue,
    },
    data () {
        return {
            openNewTable: false,
            openDeleteTable: null,
            newTable: {
                name: ''
            }
        }
    },
    methods: {
        async deleteTable(id) {
            const status = await this.$store.dispatch('Table/deleteTable', id)
            if(status.success) {
                this.$toast.success('Table deleted successfully')
                
            }else{
                this.$toast.error('Error deleting table')
            }
            this.openDeleteTable = null
        }
    }
}
</script>
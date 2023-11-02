<template>
    <ModalLayoutVue>
        <div class="w-1/2 p-8 bg-white rounded-xl">
            <div class="w-full flex justify-between">
                <h2>Add Table</h2>
                <div @click="$emit('closeModal' )">
                    CLOSE X
                </div>
            </div>
            <div class="mt-6 px-2 flex flex-col space-y-3">
                <fieldset class="w-full border rounded">
                    <legend class="ml-3 text-xs px-1">Table name</legend>
                    <input type="text" class="w-full pt-1 pb-1 px-2 outline-none" v-model="tableInfo.name" />
                </fieldset>
                <fieldset class="w-full border rounded">
                    <legend class="ml-3 text-xs px-1">Table No.</legend>
                    <input type="number" class="w-full pt-1 pb-1 px-2 outline-none" v-model="tableInfo.number" />
                </fieldset>
                <fieldset class="w-full border rounded">
                    <legend class="ml-3 text-xs px-1">Table Size</legend>
                    <input type="number" class="w-full pt-1 pb-1 px-2 outline-none" v-model="tableInfo.size" />
                </fieldset>
                <button @click="createTable" class="py-2 mt-2 self-center w-2/3 bg-primary text-white active:scale-95 rounded font-semibold">
                    SUBMIT
                </button>
            </div>
        </div>
    </ModalLayoutVue>
</template>
<script>
import { mapActions } from 'vuex'
import ModalLayoutVue from '@/layout/ModalLayout.vue'
export default {
    components: {
        ModalLayoutVue,
    },
    data () {
        return {
            tableInfo: {
                name: '',
                number: null,
                size: null,
            }
        }
    },
    methods: {
        ...mapActions({
            addTable: 'Table/addTable'
        }),
        async createTable () {
            // validation required
            const status = await this.addTable(this.tableInfo)
            if(status) {
                this.$toast.success('Table created successfully')
                setTimeout(()=>{
                    this.$emit('closeModal')
                }, 1000)
            }else {
                this.$toast.error('Table creation failed')
            }
        }
    }
}
</script>
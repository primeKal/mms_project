<template>
    <div>
        <table class="w-full border-collapse">
            <!-- create new section start -->
            <transition
                enter-from-class="h-0"
                enter-to-class="h-auto"
                enter-active-class="transition-all duration-500"
                leave-from-class="h-auto"
                leave-to-class="h-0"
                leave-active-class="transition-all duration-500"
            >
                <tr v-if="openNewCategory" class="grid grid-cols-3 bg-slate-100 lg:px-4 px-2 py-2 lg:text-base text-xs">
                    <p class="mb-1">Create new section:</p>
                    <div class="col-span-full w-full grid grid-cols-3 lg:gap-4 gap-2 bg-white p-3 rounded">
                        <input class="h-min w-full border rounded py-1 pl-2" placeholder="Section name" v-model="newCategory.name" />
                        <textarea style="resize:none;" class="h-20 rounded p-1 border" placeholder="Descripiton" v-model="newCategory.description" ></textarea>
                        <div class="flex lg:flex-row flex-col-reverse lg:justify-center justify-start lg:items-center lg:space-x-3 space-x-0 lg:space-y-0 space-y-2 lg:pl-4 pl-2 py-1">
                            <button @click="createSection" class="py-1 px-4 text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all font-semibold rounded">Save</button>
                            <button @click="$emit('closeNewCategory')" class="lg:mt-0 mt-2 py-1 px-4 text-white bg-gray-400 hover:bg-gray-500 active:scale-95 transition-all font-semibold rounded">cancel</button>
                        </div>
                    </div>
                </tr>
            </transition>
            <!-- create new section end -->
            <tr class="grid grid-cols-3 auto-cols-min bg-slate-50 border-y shadow-sm lg:text-base text-sm">
                <th class="py-2 pl-4 text-left">Name</th>
                <th class="py-2 pl-2 text-left">Descripiton</th>
                <th class="py-2 pl-4 text-center">Actions</th>
            </tr>
            <tbody>
                <CategoryRowVue 
                    v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    @loading="(value)=>{ $emit('loading', value )}"
                />              
            </tbody>
        </table>
    </div>
</template>
<script>
import CategoryRowVue from '@/components/category/CategoryRow.vue'
export default {
    props: {
        categories: Array,
        openNewCategory: Boolean,
    },
    components: {
        CategoryRowVue,
    },
    data () {
        return {
            newCategory: {
                name: '',
                description: ''
            },   
        }
    },
    methods: {
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
    }
}
</script>
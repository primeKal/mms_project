<template>
    <transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        enter-active-class="transition-opacity"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        leave-active-class="transition-opacity"
        appear
    >
        <ModalLayoutVue>
            <div class="w-1/3 bg-white p-10 rounded-lg">
                <p class="text-lg font-semibold">Delete Confirmation</p>
                <p class="mt-4">Are you sure you want to delete</p>
                <p class="mt-2 py-2 px-3 text-center border-l-8 border-red-500 bg-red-50 font-semibold text-red-500">{{ title }}</p>
                <div class="mt-6 flex justify-end">                    
                    <button @click="$emit('closeModal')" class="py-1 px-3 text-gray-400 font-medium active:scale-95 rounded">
                        Cancel
                    </button>
                    <button @click="$emit('deleteItem', id), loading = true" class="mr-2 py-1 px-3 flex items-center text-white font-medium bg-red-400 hover:bg-red-500 active:scale-95 rounded">
                        <svg v-if="loading" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                        Delete
                    </button>
                </div>
            </div>
        </ModalLayoutVue>
    </transition>        
</template>
<script>
import ModalLayoutVue from '@/layout/ModalLayout.vue'
export default {
    props: {
        title: String,
        id: Number,
    },
    components: {
        ModalLayoutVue,
    },
    data () {
        return {
            loading: false,
        }
    },
    beforeUnmount() {
        this.loading = false
    }
}
</script>
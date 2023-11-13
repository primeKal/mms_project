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
                    <button @click="$emit('deleteItem', id)" class="mr-2 py-1 px-3 text-white font-medium bg-red-400 hover:bg-red-500 active:scale-95 rounded">
                        Delete
                    </button>
                    <button @click="$emit('closeModal')" class="py-1 px-3 text-white font-medium bg-gray-400 hover:bg-gray-500 active:scale-95 rounded">
                        Cancel
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
    }
}
</script>
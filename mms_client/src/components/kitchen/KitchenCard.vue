<template>
    <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ kitchen.name }}</h3>
            <button @click="$emit('add-items', kitchen)" class="text-sm text-blue-600 hover:text-blue-700">
                <i class="fas fa-plus"></i> Add Items
            </button>
        </div>

        <div v-if="kitchen.items.length === 0" class="text-center py-4 text-gray-500">
            No items in this kitchen
        </div>

        <div v-else class="space-y-3">
            <div v-for="item in kitchen.items" :key="item.id"
                class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                    <p class="text-sm font-medium text-gray-800">{{ item.name }}</p>
                    <p class="text-xs text-gray-500">{{ item.category }}</p>
                </div>
                <div class="text-sm font-medium text-gray-600">
                    {{ item.count }} {{ item.unit }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KitchenCard',
    props: {
        kitchen: {
            type: Object,
            required: true
        }
    }
};
</script>
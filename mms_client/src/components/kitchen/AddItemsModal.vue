<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Add Items to {{ kitchen.name }}</h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="space-y-4">
                <div v-for="(item, index) in form.items" :key="index" class="flex items-end space-x-4">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-700">Item</label>
                        <select v-model="item.itemId"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required>
                            <option value="">Select an item</option>
                            <option v-for="availableItem in items" :key="availableItem.id" :value="availableItem.id">
                                {{ availableItem.name }}
                            </option>
                        </select>
                    </div>
                    <div class="w-32">
                        <label class="block text-sm font-medium text-gray-700">Count</label>
                        <input v-model.number="item.count" type="number" min="1" required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <button v-if="form.items.length > 1" @click="removeItem(index)"
                        class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>

                <button @click="addItem" class="text-blue-600 hover:text-blue-800 text-sm">
                    <i class="fas fa-plus"></i> Add Another Item
                </button>
            </div>

            <div class="flex justify-end space-x-3 mt-6">
                <button type="button" @click="$emit('close')"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
                    Cancel
                </button>
                <button @click="handleSubmit"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    :disabled="loading">
                    {{ loading ? 'Adding Items...' : 'Add Items' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'AddItemsModal',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        kitchen: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            form: {
                items: [{ itemId: '', count: 1 }]
            }
        };
    },
    computed: {
        ...mapState('Item', ['items']),
        ...mapState('Kitchen', ['loading'])
    },
    async created() {
        await this.fetchAllItems();
    },
    methods: {
        ...mapActions('Item', ['fetchAllItems']),
        ...mapActions('Kitchen', ['addItemsToKitchen']),
        addItem() {
            this.form.items.push({ itemId: '', count: 1 });
        },
        removeItem(index) {
            this.form.items.splice(index, 1);
        },
        async handleSubmit() {
            try {
                await this.addItemsToKitchen({
                    kitchenId: this.kitchen.id,
                    items: this.form.items
                });
                this.$emit('items-added', this.form.items);
                this.$emit('close');
                this.form.items = [{ itemId: '', count: 1 }];
            } catch (error) {
                console.error('Error adding items:', error);
            }
        }
    }
};
</script>
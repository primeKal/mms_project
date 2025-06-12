<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-800">Kitchens</h2>
            <button @click="showCreateModal = true"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow text-sm font-medium flex items-center gap-2">
                <i class="fas fa-plus"></i> New Kitchen
            </button>
        </div>

        <div v-if="error" class="text-center py-4 text-red-600 bg-red-50 border border-red-200 rounded">
            {{ error }}
        </div>
        <div v-if="success" class="text-center py-4 text-green-600 bg-green-50 border border-green-200 rounded">
            {{ success }}
        </div>

        <div v-if="loading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>

        <div v-else-if="kitchens?.length === 0" class="text-center py-8 text-gray-500">
            No kitchens found. Create your first kitchen to get started.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KitchenCard v-for="kitchen in kitchens" :key="kitchen.id" :kitchen="kitchen" @add-items="handleAddItems" />
        </div>

        <CreateKitchenModal :show="showCreateModal" @close="showCreateModal = false" @created="handleKitchenCreated" />

        <AddItemsModal v-if="selectedKitchen" :show="showAddItemsModal" :kitchen="selectedKitchen"
            @close="closeAddItemsModal" @items-added="handleItemsAdded" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import KitchenCard from '@/components/kitchen/KitchenCard.vue';
import CreateKitchenModal from '@/components/kitchen/CreateKitchenModal.vue';
import AddItemsModal from '@/components/kitchen/AddItemsModal.vue';

export default {
    name: 'KitchenSection',
    components: {
        KitchenCard,
        CreateKitchenModal,
        AddItemsModal
    },
    data() {
        return {
            showCreateModal: false,
            showAddItemsModal: false,
            selectedKitchen: null,
            error: '',
            success: ''
        };
    },
    computed: {
        ...mapState('Kitchen', {
            kitchens: state => state.kitchens,
            loading: state => state.loading
        })
    },
    async created() {
        await this.safeFetchKitchens();
    },
    methods: {
        ...mapActions('Kitchen', [
            'fetchKitchens',
            'createKitchen',
            'addItemsToKitchen'
        ]),
        async safeFetchKitchens() {
            console.log('safeFetchKitchens', this.fetchKitchens);
            this.error = '';
            try {
                await this.fetchKitchens();
            } catch (err) {
                this.error = err?.message || 'Failed to fetch kitchens.';
            }
        },
        async handleKitchenCreated(kitchenData) {
            this.error = '';
            this.success = '';
            console.log('handleKitchenCreated', kitchenData);
            try {
                // await this.createKitchen(kitchenData);
                this.success = 'Kitchen created successfully!';
                await this.safeFetchKitchens();
            } catch (error) {
                this.error = error?.message || 'Failed to create kitchen.';
            }
        },
        handleAddItems(kitchen) {
            this.selectedKitchen = kitchen;
            this.showAddItemsModal = true;
        },
        closeAddItemsModal() {
            this.showAddItemsModal = false;
            this.selectedKitchen = null;
        },
        async handleItemsAdded(items) {
            this.error = '';
            this.success = '';
            try {
                await this.addItemsToKitchen({
                    kitchenId: this.selectedKitchen.id,
                    items
                });
                this.success = 'Items added successfully!';
                await this.safeFetchKitchens();
                this.closeAddItemsModal();
            } catch (error) {
                this.error = error?.message || 'Failed to add items to kitchen.';
            }
        }
    }
};
</script>
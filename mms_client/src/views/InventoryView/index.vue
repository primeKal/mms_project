<template>
    <div class="container mx-auto px-4 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Inventory Management</h1>
        </div>

        <div class="mb-6">
            <nav class="flex space-x-4 border-b border-gray-200">
                <button @click="activeTab = 'items'" :class="[
                    'px-4 py-2 text-sm font-medium border-b-2 -mb-px',
                    activeTab === 'items'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]">
                    Items
                </button>
                <button @click="activeTab = 'kitchens'" :class="[
                    'px-4 py-2 text-sm font-medium border-b-2 -mb-px',
                    activeTab === 'kitchens'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]">
                    Kitchens
                </button>
            </nav>
        </div>

        <div v-if="activeTab === 'items'">
            <InventoryView />
        </div>

        <div v-else-if="activeTab === 'kitchens'">
            <KitchenSection />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import KitchenSection from './KitchenSection.vue';
import InventoryView from './InventoryView.vue';

export default {
    name: 'InventoryTabs',
    components: {
        KitchenSection,
        InventoryView
    },
    data() {
        return {
            activeTab: 'items',
            showModal: false,
            selectedInventory: null,
            selectedStatus: '',
            loading: false
        };
    },
    computed: {
        ...mapState('Inventory', ['inventories'])
    },
    async created() {
        await this.loadInventory();
    },
    methods: {
        ...mapActions('Inventory', ['fetchAllInventories', 'updateInventoryStatus']),

        async loadInventory() {
            try {
                await this.fetchAllInventories();
            } catch (error) {
                this.$toast.error('Error loading inventory');
                console.error('Error loading inventory:', error);
            }
        },
        openUpdateStatusModal(inventory) {
            this.selectedInventory = inventory;
            this.selectedStatus = inventory.status;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedInventory = null;
            this.selectedStatus = '';
        },
        async updateStatus() {
            this.loading = true;
            try {
                const status = await this.updateInventoryStatus({
                    id: this.selectedInventory.id,
                    status: this.selectedStatus
                });

                if (status.success) {
                    this.$toast.success('Inventory status updated successfully');
                    this.closeModal();
                } else {
                    this.$toast.error('Failed to update inventory status');
                }
            } catch (error) {
                this.$toast.error('Error updating inventory status');
                console.error('Error updating inventory status:', error);
            } finally {
                this.loading = false;
            }
        },
        getStatusClass(status) {
            const classes = {
                'AVAILABLE': 'bg-green-100 text-green-800',
                'LOW_STOCK': 'bg-yellow-100 text-yellow-800',
                'OUT_OF_STOCK': 'bg-red-100 text-red-800'
            };
            return `px-2 py-1 text-xs font-medium rounded-full ${classes[status] || ''}`;
        }
    }
};
</script>
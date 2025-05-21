<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Inventory Management</h1>
    </div>

    <!-- Inventory Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procurement ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="inv in inventories" :key="inv.id">
            <td class="px-6 py-4">
              <div class="text-sm font-medium text-gray-900">{{ inv.item?.name }}</div>
              <div class="text-sm text-gray-500">Unit: {{ inv.item?.unit }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ inv.quantity }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(inv.status)">
                {{ inv.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ inv.procurementId }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="openUpdateStatusModal(inv)"
                class="text-indigo-600 hover:text-indigo-900 mr-2"
              >
                Update Status
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Update Status Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
            Update Inventory Status
          </h3>
          <form @submit.prevent="updateStatus">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Status</label>
              <select
                v-model="selectedStatus"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="AVAILABLE">Available</option>
                <option value="LOW_STOCK">Low Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {{ loading ? 'Processing...' : 'Update' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'InventoryView',
  data() {
    return {
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
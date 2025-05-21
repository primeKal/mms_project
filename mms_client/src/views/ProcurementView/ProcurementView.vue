<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Procurement Management</h1>
      <button
        @click="openCreateModal"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        New Procurement Request
      </button>
    </div>

    <!-- Procurement Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="proc in procurements" :key="proc.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ proc.item?.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ proc.quantity }}</td>
            <td class="px-6 py-4 whitespace-nowrap">${{ proc.totalPrice }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(proc.status)">
                {{ proc.status }}
              </span>
            </td>
            <td class="px-6 py-4">{{ proc.remarks }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                v-if="proc.status === 'PENDING'"
                @click="updateStatus(proc.id, 'APPROVED')"
                class="text-green-600 hover:text-green-900 mr-2"
              >
                Approve
              </button>
              <button
                v-if="proc.status === 'PENDING'"
                @click="updateStatus(proc.id, 'REJECTED')"
                class="text-red-600 hover:text-red-900 mr-2"
              >
                Reject
              </button>
              <button
                v-if="proc.status === 'PENDING'"
                @click="confirmDelete(proc.id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
            Create Procurement Request
          </h3>
          <form @submit.prevent="saveProcurement">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Item</label>
              <select
                v-model="formData.itemId"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                @change="updateTotalPrice"
              >
                <option value="">Select an item</option>
                <option v-for="item in items" :key="item.id" :value="item.id">
                  {{ item.name }} - ${{ item.unitPrice }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
              <input
                v-model.number="formData.quantity"
                type="number"
                min="1"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                @input="updateTotalPrice"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Total Price</label>
              <input
                v-model="formData.totalPrice"
                type="number"
                step="0.01"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
                readonly
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Remarks</label>
              <textarea
                v-model="formData.remarks"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
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
                {{ loading ? 'Processing...' : 'Create' }}
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
  name: 'ProcurementView',
  data() {
    return {
      showModal: false,
      loading: false,
      formData: {
        itemId: '',
        quantity: 1,
        totalPrice: 0,
        remarks: ''
      }
    };
  },
  computed: {
    ...mapState('Procurement', ['procurements']),
    ...mapState('Item', ['items'])
  },
  async created() {
    await this.loadData();
  },
  methods: {
    ...mapActions('Procurement', [
      'fetchAllProcurements',
      'createProcurement',
      'updateProcurementStatus',
      'deleteProcurement'
    ]),
    ...mapActions('Item', ['fetchAllItems']),
    
    async loadData() {
      try {
        await Promise.all([
          this.fetchAllProcurements(),
          this.fetchAllItems()
        ]);
      } catch (error) {
        this.$toast.error('Error loading data');
        console.error('Error loading data:', error);
      }
    },
    openCreateModal() {
      this.formData = {
        itemId: '',
        quantity: 1,
        totalPrice: 0,
        remarks: ''
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.formData = {
        itemId: '',
        quantity: 1,
        totalPrice: 0,
        remarks: ''
      };
    },
    updateTotalPrice() {
      if (this.formData.itemId && this.formData.quantity) {
        const selectedItem = this.items.find(item => item.id === this.formData.itemId);
        if (selectedItem) {
          this.formData.totalPrice = selectedItem.unitPrice * this.formData.quantity;
        }
      }
    },
    async saveProcurement() {
      this.loading = true;
      try {
        const status = await this.createProcurement(this.formData);
        if (status.success) {
          this.$toast.success('Procurement request created successfully');
          this.closeModal();
        } else {
          this.$toast.error('Failed to create procurement request');
        }
      } catch (error) {
        this.$toast.error('Error creating procurement request');
        console.error('Error saving procurement:', error);
      } finally {
        this.loading = false;
      }
    },
    async updateStatus(id, status) {
      try {
        const remarks = status === 'REJECTED' ? prompt('Please provide rejection reason:') : '';
        const result = await this.updateProcurementStatus({ id, status, remarks });
        if (result.success) {
          this.$toast.success(`Procurement request ${status.toLowerCase()}`);
        } else {
          this.$toast.error(`Failed to ${status.toLowerCase()} procurement request`);
        }
      } catch (error) {
        this.$toast.error('Error updating procurement status');
        console.error('Error updating status:', error);
      }
    },
    async confirmDelete(id) {
      if (confirm('Are you sure you want to delete this procurement request?')) {
        try {
          const status = await this.deleteProcurement(id);
          if (status.success) {
            this.$toast.success('Procurement request deleted successfully');
          } else {
            this.$toast.error('Failed to delete procurement request');
          }
        } catch (error) {
          this.$toast.error('Error deleting procurement request');
          console.error('Error deleting procurement:', error);
        }
      }
    },
    getStatusClass(status) {
      const classes = {
        'PENDING': 'bg-yellow-100 text-yellow-800',
        'APPROVED': 'bg-green-100 text-green-800',
        'REJECTED': 'bg-red-100 text-red-800',
        'COMPLETED': 'bg-blue-100 text-blue-800'
      };
      return `px-2 py-1 text-xs font-medium rounded-full ${classes[status] || ''}`;
    }
  }
};
</script> 
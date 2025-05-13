<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Items Management</h1>
      <button
        @click="openCreateModal"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add New Item
      </button>
    </div>

    <!-- Items Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Measurement</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in items" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
            <td class="px-6 py-4">{{ item.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap">${{ item.unitPrice }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.unit }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.measurementUnit }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="editItem(item)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(item.id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
            {{ editingItem ? 'Edit Item' : 'Create New Item' }}
          </h3>
          <form @submit.prevent="saveItem">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                v-model="formData.name"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                v-model="formData.description"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Unit Price</label>
              <input
                v-model="formData.unitPrice"
                type="number"
                step="0.01"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Unit</label>
              <input
                v-model="formData.unit"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Measurement Unit</label>
              <select
                v-model="formData.measurementUnit"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a measurement unit</option>
                <option v-for="unit in measurementUnits" :key="unit.value" :value="unit.value">
                  {{ unit.label }}
                </option>
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
                {{ loading ? 'Processing...' : (editingItem ? 'Update' : 'Create') }}
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
import { MEASUREMENT_UNITS } from '@/constants/units';

export default {
  name: 'ItemsView',
  data() {
    return {
      showModal: false,
      editingItem: null,
      measurementUnits: MEASUREMENT_UNITS,
      loading: false,
      formData: {
        name: '',
        description: '',
        unitPrice: '',
        unit: '',
        measurementUnit: ''
      }
    };
  },
  computed: {
    ...mapState('Item', ['items'])
  },
  async created() {
    await this.loadItems();
  },
  methods: {
    ...mapActions('Item', ['fetchAllItems', 'addNewItem', 'updateItem', 'deleteItem']),
    async loadItems() {
      try {
        await this.fetchAllItems();
      } catch (error) {
        this.$toast.error('Error loading items');
        console.error('Error loading items:', error);
      }
    },
    openCreateModal() {
      this.editingItem = null;
      this.formData = {
        name: '',
        description: '',
        unitPrice: '',
        unit: '',
        measurementUnit: ''
      };
      this.showModal = true;
    },
    editItem(item) {
      this.editingItem = item;
      this.formData = { ...item };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingItem = null;
      this.formData = {
        name: '',
        description: '',
        unitPrice: '',
        unit: '',
        measurementUnit: ''
      };
    },
    async saveItem() {
      this.loading = true;
      try {
        let status;
        if (this.editingItem) {
          status = await this.updateItem({
            id: this.editingItem.id,
            itemData: this.formData
          });
        } else {
          status = await this.addNewItem(this.formData);
        }

        if (status.success) {
          this.$toast.success(`Item ${this.editingItem ? 'updated' : 'created'} successfully`);
          this.closeModal();
        } else {
          this.$toast.error(`Failed to ${this.editingItem ? 'update' : 'create'} item`);
        }
      } catch (error) {
        this.$toast.error(`Error ${this.editingItem ? 'updating' : 'creating'} item`);
        console.error('Error saving item:', error);
      } finally {
        this.loading = false;
      }
    },
    async confirmDelete(id) {
      if (confirm('Are you sure you want to delete this item?')) {
        try {
          const status = await this.deleteItem(id);
          if (status.success) {
            this.$toast.success('Item deleted successfully');
          } else {
            this.$toast.error('Failed to delete item');
          }
        } catch (error) {
          this.$toast.error('Error deleting item');
          console.error('Error deleting item:', error);
        }
      }
    }
  }
};
</script> 
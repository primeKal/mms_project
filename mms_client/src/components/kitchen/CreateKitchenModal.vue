<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Create New Kitchen</h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Kitchen Name</label>
                    <input v-model="form.name" type="text" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter kitchen name" />
                </div>

                <div class="flex justify-end space-x-3 mt-6">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
                        Cancel
                    </button>
                    <button type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        :disabled="loading">
                        {{ loading ? 'Creating...' : 'Create Kitchen' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'CreateKitchenModal',
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            form: {
                name: ''
            }
        };
    },
    computed: {
        ...mapState('Kitchen', ['loading'])
    },
    methods: {
        ...mapActions('Kitchen', ['createKitchen']),
        async handleSubmit() {
            try {
                const kitchen = await this.createKitchen(this.form);
                this.$emit('created', kitchen);
                this.$emit('close');
                this.form.name = '';
            } catch (error) {
                console.error('Error creating kitchen:', error);
            }
        }
    }
};
</script>
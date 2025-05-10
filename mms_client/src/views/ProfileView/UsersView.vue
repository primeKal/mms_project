<template>
    <div class="p-6 pr-12 w-full">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-primary font-medium text-xl">Users</h3>
            <button v-if="canEditUsers" @click="showCreateModal = true"
                class="py-2 px-5 bg-primary text-white rounded">Create User</button>
        </div>
        <div class="mb-8 p-4 border rounded bg-white0 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full border bg-gray-100 overflow-hidden flex items-center justify-center">
                    <img v-if="currentUser.profileImage" :src="`${apiBase}/${currentUser.profileImage}`"
                        class="object-cover w-full h-full" />
                    <span v-else class="text-xs text-gray-400">No Image</span>
                </div>
                <div>
                    <div class="font-semibold">{{ currentUser.firstName }} {{ currentUser.lastName }}</div>
                    <div class="text-sm text-gray-600">{{ currentUser.email }}</div>
                    <div class="text-sm text-gray-600">{{ currentUser.username }}</div>
                </div>
            </div>
            <button @click="openEditModal(currentUser)" class="py-2 px-4 bg-primary text-white rounded">Edit</button>
        </div>
        <div v-if="canEditUsers">
            <h4 class="text-lg font-semibold mb-2">Other Users</h4>
            <table class="w-full border rounded bg-white0">
                <thead>
                    <tr class="border-b">
                        <th class="py-2 px-3 text-left">Profile</th>
                        <th class="py-2 px-3 text-left">Name</th>
                        <th class="py-2 px-3 text-left">Email</th>
                        <th class="py-2 px-3 text-left">Username</th>
                        <th class="py-2 px-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id" class="border-b">
                        <td>
                            <div
                                class="w-10 h-10 rounded-full border bg-gray-100 overflow-hidden flex items-center justify-center">
                                <img v-if="user.profileImage" :src="`${apiBase}/${user.profileImage}`"
                                    class="object-cover w-full h-full" />
                                <span v-else class="text-xs text-gray-400">No Image</span>
                            </div>
                        </td>
                        <td>{{ user.firstName }} {{ user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.username }}</td>
                        <td>
                            <button @click="openEditModal(user)"
                                class="p-2 text-primary hover:bg-gray-100 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Create User Modal -->
        <div v-if="showCreateModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h4 class="text-lg font-semibold mb-4 text-center">Create New User</h4>
                <form @submit.prevent="handleCreateUser">
                    <div class="flex flex-col items-center mb-4">
                        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onImageChange" />
                        <div @click="$refs.fileInput.click()"
                            class="w-20 h-20 rounded-full border flex items-center justify-center cursor-pointer bg-gray-100 overflow-hidden mb-2">
                            <img v-if="imagePreview" :src="imagePreview" class="object-cover w-full h-full" />
                            <img v-else-if="newUser.profileImage && typeof newUser.profileImage === 'string'"
                                :src="`${apiBase}/${newUser.profileImage}`" class="object-cover w-full h-full" />
                            <span v-else class="text-xs text-gray-400">Select Image</span>
                        </div>
                        <button v-if="imagePreview" type="button" @click="removeImage"
                            class="text-xs text-red-500">Remove</button>
                    </div>
                    <div class="mb-3 flex gap-2">
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">First Name</label>
                            <input v-model="newUser.firstName" class="py-2 pl-2 rounded border w-full" type="text"
                                required />
                        </div>
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Last Name</label>
                            <input v-model="newUser.lastName" class="py-2 pl-2 rounded border w-full" type="text"
                                required />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm text-gray-700">Email</label>
                        <input v-model="newUser.email" class="py-2 pl-2 rounded border w-full" type="email" required />
                    </div>
                    <div class="mb-3 flex gap-2">
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Username</label>
                            <input v-model="newUser.username" class="py-2 pl-2 rounded border w-full" type="text"
                                required />
                        </div>
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Password</label>
                            <input v-model="newUser.password" class="py-2 pl-2 rounded border w-full" type="password"
                                required />
                        </div>
                    </div>
                    <div class="mb-3 flex gap-2">
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Phone Number</label>
                            <input v-model="newUser.phoneNumber" class="py-2 pl-2 rounded border w-full" type="text" />
                        </div>
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Auth Type</label>
                            <input v-model="newUser.authType" class="py-2 pl-2 rounded border w-full" type="text" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm text-gray-700">Roles</label>
                        <select v-model="newUser.roleIds" class="py-2 pl-2 rounded border w-full" multiple required>
                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-end gap-2">
                        <button type="button" @click="showCreateModal = false"
                            class="py-2 px-4 rounded border">Cancel</button>
                        <button type="submit" class="py-2 px-4 bg-primary text-white rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Edit User Modal -->
        <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h4 class="text-lg font-semibold mb-4 text-center">Edit User</h4>
                <form @submit.prevent="handleEditUser">
                    <div class="flex flex-col items-center mb-4">
                        <input ref="editFileInput" type="file" accept="image/*" class="hidden"
                            @change="onEditImageChange" />
                        <div @click="$refs.editFileInput.click()"
                            class="w-20 h-20 rounded-full border flex items-center justify-center cursor-pointer bg-gray-100 overflow-hidden mb-2">
                            <img v-if="editImagePreview" :src="editImagePreview" class="object-cover w-full h-full" />
                            <img v-else-if="editUser.profileImage && typeof editUser.profileImage === 'string'"
                                :src="`${apiBase}/${editUser.profileImage}`" class="object-cover w-full h-full" />
                            <span v-else class="text-xs text-gray-400">Select Image</span>
                        </div>
                        <button v-if="editImagePreview" type="button" @click="removeEditImage"
                            class="text-xs text-red-500">Remove</button>
                    </div>
                    <div class="mb-3 flex gap-2">
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">First Name</label>
                            <input v-model="editUser.firstName" class="py-2 pl-2 rounded border w-full" type="text"
                                required />
                        </div>
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Last Name</label>
                            <input v-model="editUser.lastName" class="py-2 pl-2 rounded border w-full" type="text"
                                required />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm text-gray-700">Email</label>
                        <input v-model="editUser.email" class="py-2 pl-2 rounded border w-full" type="email" required />
                    </div>
                    <div class="mb-3 flex gap-2">
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Username</label>
                            <input v-model="editUser.username" class="py-2 pl-2 rounded border w-full" type="text"
                                required />
                        </div>
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Password</label>
                            <input v-model="editUser.password" class="py-2 pl-2 rounded border w-full"
                                type="password" />
                        </div>
                    </div>
                    <div class="mb-3 flex gap-2">
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Phone Number</label>
                            <input v-model="editUser.phoneNumber" class="py-2 pl-2 rounded border w-full" type="text" />
                        </div>
                        <div class="w-1/2">
                            <label class="block text-sm text-gray-700">Auth Type</label>
                            <input v-model="editUser.authType" class="py-2 pl-2 rounded border w-full" type="text" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm text-gray-700">Roles</label>
                        <select v-model="editUser.roleIds" class="py-2 pl-2 rounded border w-full" multiple required>
                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-end gap-2">
                        <button type="button" @click="showEditModal = false"
                            class="py-2 px-4 rounded border">Cancel</button>
                        <button type="submit" class="py-2 px-4 bg-primary text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            currentUser: {},
            showCreateModal: false,
            showEditModal: false,
            newUser: {
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: '',
                phoneNumber: '',
                authType: '',
                roleIds: [],
                profileImage: null,
            },
            imagePreview: null,
            editUser: {},
            editImagePreview: null,
        };
    },
    computed: {
        ...mapGetters({
            user: 'User/getUser',
            companyUsers: 'User/getCompanyUsers',
            roles: 'User/getRoles',
        }),
        canEditUsers() {
            return this.user && this.user.roles && this.user.roles.some(role => role.name === 'Company');
        },
        users() {
            return this.canEditUsers ? this.companyUsers.filter(u => u.id !== this.user.id) : [];
        },
        apiBase() {
            return process.env.VUE_APP_API_SERVER_PUBLIC || 'http://localhost:3003';
        },
    },
    methods: {
        ...mapActions('User', ['fetchCompanyUsers', 'updateUser', 'createUser', 'fetchRoles']),
        openEditModal(user) {
            this.editUser = { ...user };
            this.editImagePreview = user.profileImage || null;
            this.showEditModal = true;
        },
        async updateCurrentUser() {
            this.openEditModal(this.currentUser);
        },
        async handleEditUser() {
            const formData = new FormData();
            for (const key in this.editUser) {
                if (key === 'profileImage' && this.editUser.profileImage && typeof this.editUser.profileImage !== 'string') {
                    formData.append('profileImage', this.editUser.profileImage);
                } else if (key === 'roleIds') {
                    this.editUser.roleIds.forEach(id => formData.append('roleIds', id));
                } else if (this.editUser[key] !== null && this.editUser[key] !== undefined) {
                    formData.append(key, this.editUser[key]);
                }
            }
            const success = await this.updateUser({ id: this.editUser.id, data: formData });
            if (success) {
                this.$toast.success('User updated!');
                this.showEditModal = false;
                this.editUser = {};
                this.editImagePreview = null;
            } else {
                this.$toast.error('Failed to update user!');
            }
        },
        async handleCreateUser() {
            const formData = new FormData();
            this.newUser.companyId = this.user.company.id;
            for (const key in this.newUser) {
                if (key === 'profileImage' && this.newUser.profileImage) {
                    formData.append('profileImage', this.newUser.profileImage);
                } else if (key === 'roleIds') {
                    this.newUser.roleIds.forEach(id => formData.append('roleIds', id));
                } else if (this.newUser[key] !== null && this.newUser[key] !== undefined) {
                    formData.append(key, this.newUser[key]);
                }
            }
            const success = await this.createUser(formData);
            if (success) {
                this.$toast.success('User created!');
                this.showCreateModal = false;
                this.newUser = { firstName: '', lastName: '', email: '', username: '', password: '', phoneNumber: '', authType: '', companyId: '', roleIds: [], profileImage: null };
                this.imagePreview = null;
            } else {
                this.$toast.error('Failed to create user!');
            }
        },
        onImageChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.newUser.profileImage = file;
                this.imagePreview = URL.createObjectURL(file);
            }
        },
        removeImage() {
            this.newUser.profileImage = null;
            this.imagePreview = null;
        },
        onEditImageChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.editUser.profileImage = file;
                this.editImagePreview = URL.createObjectURL(file);
            }
        },
        removeEditImage() {
            this.editUser.profileImage = null;
            this.editImagePreview = null;
        },
    },
    async mounted() {
        if (this.canEditUsers) {
            await this.fetchCompanyUsers();
        }
        if (!this.roles || this.roles.length === 0) {
            await this.fetchRoles();
        }
        this.currentUser = { ...this.user };
    },
};
</script>
<style scoped>
input[disabled] {
    background: #f3f3f3;
}
</style>
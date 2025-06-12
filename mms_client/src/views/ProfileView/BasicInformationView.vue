<template>
    <div class="p-6 pr-12 w-full" :class="{ 'edit-mode': editStatus === false }">
        <div class="flex justify-between m-2">
            <h3 class="text-primary font-medium text-xl">Company Information</h3>
            <button v-if="canEdit && editStatus" v-on:click="switchEditState()"
                class="py-2 px-5 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="m14.06 9l.94.94L5.92 19H5v-.92L14.06 9m3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75Z" />
                </svg>
                Edit
            </button>
            <button v-if="!editStatus && canEdit" :disabled="editStatus === true ? true : false"
                :onClick="handleUpdateCompany"
                class="py-2 px-5 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="m14.06 9l.94.94L5.92 19H5v-.92L14.06 9m3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75Z" />
                </svg>
                Submit Change
            </button>
        </div>
        <textarea v-if="!editStatus" class="py-2 pl-2 rounded border w-full bg-white0 mb-4" rows="4"
            placeholder="Special Feature" type="textarea" v-model.trim="company.story" />
        <div v-else class="mb-4">{{ company.story }}</div>
        <hr class="my-7 border w-full" />
        <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Basic</h3>
        </div>
        <div class="w-full mt-5 flex gap-3">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Name</label>
                <input v-if="!editStatus" class="py-2 pl-2 rounded border bg-white0" placeholder="Name" type="text"
                    v-model.trim="company.name" />
                <div v-else class="py-2 pl-2">{{ company.name }}</div>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">User name</label>
                <input v-if="!editStatus" class="py-2 pl-2 rounded border bg-white0" placeholder="User name" type="text"
                    v-model.trim="company.username" />
                <div v-else class="py-2 pl-2">{{ company.username }}</div>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Special features</label>
                <input v-if="!editStatus" class="py-2 pl-2 rounded border bg-white0" placeholder="Special Feature"
                    type="text" v-model.trim="company.specialFeatures" />
                <div v-else class="py-2 pl-2">{{ company.specialFeatures }}</div>
            </div>
        </div>
        <hr class="my-7 border w-full" />
        <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Contact</h3>
        </div>
        <div class="w-full mt-5 flex gap-3">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Phone Number</label>
                <input v-if="!editStatus" class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="+251"
                    type="text" v-model.trim="company.contact_information" />
                <div v-else class="py-2 pl-2">{{ company.contact_information }}</div>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Email Address</label>
                <input v-if="!editStatus" class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="Email"
                    type="text" v-model.trim="company.email" />
                <div v-else class="py-2 pl-2">{{ company.email }}</div>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Website</label>
                <input v-if="!editStatus" class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="Website"
                    type="text" v-model.trim="company.website" />
                <div v-else class="py-2 pl-2">{{ company.website }}</div>
            </div>
        </div>
        <hr class="my-7 border w-full" />
        <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Other Information</h3>
        </div>
        <div class="w-full mt-5 flex gap-3">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Address</label>
                <input v-if="!editStatus" class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="Address"
                    type="text" v-model.trim="company.address" />
                <div v-else class="py-2 pl-2">{{ company.address }}</div>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Motto</label>
                <input v-if="!editStatus" class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="Motto"
                    type="text" v-model.trim="company.motto" />
                <div v-else class="py-2 pl-2">{{ company.motto }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

    data() {
        return {
            company: {
                id: '',
                name: '',
                username: '',
                story: 'Replace me with a story about your company.',
                motto: '',
                email: '',
                address: '',
                website: '',
                specialFeatures: '',
                contact_information: '',
            },
            editStatus: true,
        }
    },
    methods: {
        initialization() {
            if (!this.user || !this.user.company) return;
            const company = this.user.company;
            this.company.id = company.id;
            this.company.name = company.name;
            this.company.username = company.username;
            this.company.email = company.email;
            this.company.specialFeatures = company.specialFeatures;
            this.company.address = company.address;
            this.company.motto = company.motto;
            this.company.contact_information = company.contact_information;
            this.company.website = company.website;
            this.company.story = company.story === "" ? "Replace me with a story about your company." : company.story;
        },

        switchEditState() {
            console.log(this.editStatus)
            this.editStatus = !this.editStatus;
        },

        async handleUpdateCompany() {
            const updatedUser = { ...this.user, company: { ...this.company } };
            const status = await this.$store.dispatch('Company/updateCompany', updatedUser);
            if (status) {
                this.$toast.success('Company information updated');
                this.editStatus = true;
            } else {
                this.$toast.error('Error occurred!');
            }
        }
    },

    computed: {
        ...mapGetters({
            user: 'User/getUser'
        }),
        basicInfo() {
            return (this.user && this.user.company) ? this.user.company : {};
        },
        canEdit() {
            return this.user && this.user.roles && this.user.roles.some(role => role.name === 'Company');
        }
    },
    mounted() {
        this.initialization();
    }
}
</script>
<style scoped>
.edit-mode {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03);
}
</style>
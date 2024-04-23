<template>
    <div class="p-6 pr-12 w-full">
        <div class="flex justify-between">
            <h3 class="text-primary font-medium text-xl">Our Story</h3>
            <button v-on:click="switchEditState()"
                class="py-2 px-5 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="m14.06 9l.94.94L5.92 19H5v-.92L14.06 9m3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75Z" />
                </svg>
                Edit
            </button>
        </div>
        <textarea :disabled="editStatus === true ? true : false" class="py-2 pl-2 rounded border w-full bg-white0"
            rows="4" placeholder="Special Feature" type="textarea" v-model.trim="company.story" />

        <hr class="my-7 border w-full" />
        <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Basic </h3>
        </div>

        <div class="w-full mt-5 flex gap-3">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Name</label>
                <input :disabled="editStatus === true ? true : false" class="py-2 pl-2 rounded border bg-white0"
                    placeholder="Name" type="text" v-model.trim="company.name" />
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">User name</label>
                <!-- <p class="mt-2 font-medium">+2519-65-34-4567</p> -->
                <input :disabled="editStatus === true ? true : false" class="py-2 pl-2 rounded border bg-white0"
                    placeholder="User name" type="text" v-model.trim="company.username" />
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Special features</label>
                <!-- <p class="mt-2 font-medium">+2519-65-34-4567</p> -->
                <input :disabled="editStatus === true ? true : false" class="py-2 pl-2 rounded border bg-white0"
                    placeholder="Special Feature" type="text" v-model.trim="company.specialFeatures" />
            </div>

        </div>
        <!-- <p v-else class="mt-5">No Special Features mentioned</p> -->
        <hr class="my-7 border w-full" />
        <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Contact</h3>
            <!-- <EditButtonVue /> -->
        </div>
        <div class="w-full mt-5 flex gap-3">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Phone Number</label>
                <!-- <p class="mt-2 font-medium">+2519-65-34-4567</p> -->
                <input :disabled="editStatus === true ? true : false"
                    class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="+251" type="text"
                    v-model.trim="company.contact_information" />
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Email Address</label>
                <input :disabled="editStatus === true ? true : false"
                    class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="Email" type="text"
                    v-model.trim="company.email" />
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Website</label>
                <!-- <p class="mt-2 font-medium">www.sheraton.com</p> -->
                <input :disabled="editStatus === true ? true : false"
                    class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="Website" type="text"
                    v-model.trim="company.website" />
            </div>
        </div>
        <hr class="my-7 border w-full" />
        <div class="mt-7 flex justify-between">
            <h3 class="text-primary font-medium text-xl">Other Information</h3>
            <button :disabled="editStatus === true ? true : false" :onClick="handleUpdateCompany"
                class="py-2 px-5 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="m14.06 9l.94.94L5.92 19H5v-.92L14.06 9m3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75Z" />
                </svg>
                Submit Change
            </button>
        </div>
        <div class="w-full mt-5 flex gap-3">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Address</label>
                <!-- <p class="mt-2 font-medium">+2519-65-34-4567</p> -->
                <input :disabled="editStatus === true ? true : false"
                    class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="Address" type="text"
                    v-model.trim="company.address" />
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Moto</label>
                <!-- <p class="mt-2 font-medium">+2519-65-34-4567</p> -->
                <input :disabled="editStatus === true ? true : false"
                    class="py-2 pl-2 font-medium rounded border bg-white0" placeholder="Moto" type="text"
                    v-model.trim="company.moto" />
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
                story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius mauris id sem pretium, id pellentesque risus facilisis. Sed mattis mattis commodo. Aliquam sagittis tempor massa sit amet venenatis. Sed convallis dictum mauris. Morbi tempor elementum erat, sit amet dapibus felis lacinia in. Aliquam imperdiet iaculis dolor non dignissim. Fusce lobortis justo scelerisque augue tempus, vitae dapibus risus consequat. In nec urna nibh. Maecenas efficitur neque massa, vitae aliquam nisi malesuada blandit. Etiam placerat pretium commodo.',
                moto: '',
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
            this.company.id = this.basicInfo.id
            this.company.name = this.basicInfo.name
            this.company.username = this.basicInfo.username
            this.company.email = this.basicInfo.email
            this.company.specialFeatures = this.basicInfo.specialFeatures
            this.company.address = this.basicInfo.address
            this.company.moto = this.basicInfo.moto
            this.company.contact_information = this.basicInfo.contact_information
        },

        switchEditState() {
            console.log(this.editStatus)
            this.editStatus = !this.editStatus;
        },

        async handleUpdateCompany() {
            console.log(this.company)
            const status = await this.$store.dispatch('Company/updateCompany', this.company)
            if (status) {
                this.$toast.success('Company information updated')
            } else {
                this.$toast.error('Error occured!')
            }
        }
    },

    computed: {
        ...mapGetters({
            basicInfo: 'Company/getCompanyInfo'
        })
    },
    mounted() {
        this.initialization();
    }
}
</script>
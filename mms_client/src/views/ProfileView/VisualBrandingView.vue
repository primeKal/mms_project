<template>
    <div class="p-6 pr-12 w-full">
        <div class="flex justify-between m-2">
            <h3 class="text-primary font-medium text-xl">Visual Branding</h3>
            <button v-if="editStatus" :disabled="editStatus === true ? false : true" :onClick="handleUpdateCompany"
                class="py-2 px-5 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="m14.06 9l.94.94L5.92 19H5v-.92L14.06 9m3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75Z" />
                </svg>
                Submit Change
            </button>
        </div>
        <p class="mt-5 text-black/50">Please select your brand colors as primary and secondary color</p>
        <div class="w-full mt-5 flex">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Primary Color</label>
                <div class="mt-2 flex items-center">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><rect width="192" height="192" x="32" y="32" :fill="primaryColor" rx="16"/></svg> -->
                    <color-picker v-model:pureColor="primaryColor" format="hex" shape="circle" pickerType="chrome"
                        useType="pure" lang="En" />
                    <label class="ml-2 font-medium">{{ primaryColor }}</label>
                </div>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Secondary Color</label>
                <div class="mt-2 flex items-center">
                    <color-picker v-model:pureColor="secondaryColor" format="hex" shape="circle" pickerType="chrome"
                        useType="pure" lang="En" />
                    <label class="ml-2 font-medium">{{ secondaryColor }}</label>
                </div>
            </div>
            <div class="w-1/3 flex flex-col">

            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
export default {
    components: {
        ColorPicker,
    },
    setup() {
        const primaryColor = ref("#28ff00");
        const secondaryColor = ref("#ff6600");
        return {
            primaryColor,
            secondaryColor
        }
    },
    data() {
        return {
            openColorSelector: 0,
            editStatus: false,
            initialLoad: true
        }
    },
    methods: {
        async handleUpdateCompany() {
            if (!this.user) return;
            const payload = { ...this.user, company: { ...this.basicInfo, primaryColor: this.primaryColor, secondaryColor: this.secondaryColor } };
            const status = await this.$store.dispatch('User/setUser', payload);
            if (status) {
                this.$toast.success('Company information updated');
                this.editStatus = false;
            } else {
                this.$toast.error('Error occured!');
            }
        },
        switchEditState() {
            console.log("changing")
            console.log(this.editStatus)
            this.editStatus = true;
        },
    },
    computed: {
        ...mapGetters({
            user: 'User/getUser',
        }),
        basicInfo() {
            return (this.user && this.user.company) ? this.user.company : {};
        }
    },
    watch: {
        primaryColor(newValue) {
            console.log(newValue);
            if (this.initialLoad) {
                this.initialLoad = false;
            } else {
                this.editStatus = true;
            }
        },
        secondaryColor(newValue) {
            console.log(newValue);
            if (!this.initialLoad) {
                this.editStatus = true;
            }
        }
    },
    mounted() {
        if (this.basicInfo) {
            this.primaryColor = this.basicInfo.primaryColor;
            this.secondaryColor = this.basicInfo.secondaryColor;
        }
        console.log(this.basicInfo);
    }
}
</script>
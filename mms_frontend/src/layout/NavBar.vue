<template>
    <div class="bg-white flex justify-between items-center px-2 py-4 lg:px-24 w-full">
        <!-- <div class="hidden lg:block"> -->
        <button
            class="text-2xl text-primary font-semibold font-poppins flex outline-none items-center justify-between gap-4">
            <img src="@/assets/mms_logo.png" width="60" height="60" />
            ZEUS MENU'S
        </button>
        <!-- </div> -->
        <!-- <div class="lg:hidden flex items-center">
            <button @click="toggleNav" class="focus:outline-none">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                </svg>
            </button>
        </div> -->
        <!-- <div v-if="showNav" class="lg:flex items-center flex-col md:flex-row">
            <ul class="flex space-x-6 flex-col md:flex-row">
                <li :class="[selectedSection == 1 ? 'text-black font-medium' : 'text-black/50 font-normal']">About Us
                </li>
                <li :class="[selectedSection == 2 ? 'text-black font-medium' : 'text-black/50 font-normal']">Pricing
                </li>
                <li :class="[selectedSection == 3 ? 'text-black font-medium' : 'text-black/50 font-normal']">
                    Testimonials
                </li>
                <li :class="[selectedSection == 4 ? 'text-black font-medium' : 'text-black/50 font-normal']">Contact
                </li>
            </ul>

        </div> -->
        <div class="flex items-center m-2">
            <a :href="menusUrlLogin" target="_blank"><button class="outline-none py-2 font-semibold">Login</button></a>
            <a :href="menusUrlRegistration" target="_blank"><button
                    class="ml-5 py-2 px-5 bg-secondary rounded-3xl text-white font-semibold">Sign up</button></a>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        selectedSection: {
            type: Number,
            required: true
        },
        menusUrlLogin: {
            type: String,
            default: process.env.VUE_APP_ZUES_MENUS_CLIENT_URL
        },
        menusUrlRegistration: {
            type: String,
            default: process.env.VUE_APP_ZUES_MENUS_CLIENT_URL + "/registration"
        }

    },
    data() {
        return {
            showNav: false,
        };
    },
    mounted() {
        this.checkWindowSize();
    },
    methods: {
        checkWindowSize() {
            const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (width >= 1024) { // Assuming 1024px as the breakpoint for "large"
                this.showNav = true;
            } else {
                this.showNav = false;
            }
        },
        toggleNav() {
            this.showNav = !this.showNav;
        },
    },
};
</script>
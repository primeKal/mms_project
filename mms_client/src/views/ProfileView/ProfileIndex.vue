<template>
    <div class="flex flex-col min-h-full overflow-y-auto">
        <div class="w-full h-80 z-0">
            <img class="w-full" :src="`/images/${image}`" />
        </div>
        <div class="-mt-8 pl-10 pb-7 flex items-end">
            <img class="z-20 h-36 w-36 overflow-hidden  rounded-full object-cover shadow-lg" :src="`/images/${logo}`" />
            <h1 class="ml-5 mb-4 text-primary font-medium text-3xl">{{ basicInfo.name }}</h1>
        </div>
        <div class="flex">
            <button v-for="(tab, index) in profileTabs" :key="tab.link" @click="fetchTab(index)"
                class="tab-btn py-2 px-4 flex items-center text-sm font-light border-b-4 transition-colors ease-in-out duration-500"
                :class="[tab.link === $route.name ? 'text-primary border-primary bg-gray-100' : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-primary']"
                style="cursor:pointer;">
                <Icon :icon="tab.icon" class="mr-2" />
                <label>{{ tab.name }}</label>
            </button>
        </div>
        <div class="overflow-x-hidden min-h-[500px] transition-all duration-300">
            <router-view v-slot="{ Component }">
                <transition mode="out-in" :name="transitionDirection">
                    <component :is="Component"></component>
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Icon } from '@iconify/vue'
export default {
    components: {
        Icon,
    },
    data() {
        return {
            image: 'restaurant_image.png',
            logo: 'restaurant_logo.png',
            openTab: { 'name': 'COMPANY INFORMATION', 'link': 'company_information', 'icon': 'mdi:information-slab-circle-outline' },
            transitionDirection: 'right',
            profileTabs: [
                { 'name': 'COMPANY INFORMATION', 'link': 'company_information', 'icon': 'mdi:information-slab-circle-outline' },
                { 'name': 'USERS', 'link': 'users', 'icon': 'mdi:account-group-outline' },
                { 'name': 'VISUAL BRANDING', 'link': 'visual_branding', 'icon': 'mdi:palette-outline' },
                { 'name': 'BILLING INFORMATION', 'link': 'billing_information', 'icon': 'mdi:credit-card-outline' },
                { 'name': 'OPERATION HOURS', 'link': 'operation_hours', 'icon': 'mdi:clock-time-four-outline' },
                { 'name': 'CUSINE & SPECIALTY', 'link': 'cusine_speciality', 'icon': 'material-symbols:ramen-dining-outline-rounded' },
                { 'name': 'IMAGE GALLERY', 'link': 'image_gallery', 'icon': 'mdi:image-outline' },
            ]
        }
    },
    computed: {
        ...mapGetters({
            user: 'User/getUser'
        }),
        basicInfo() {
            return (this.user && this.user.company) ? this.user.company : {};
        }
    },
    methods: {
        fetchTab(tab) {
            var currentIndex = this.profileTabs.findIndex((nowTab) => {
                return nowTab == this.openTab
            })
            if (tab > currentIndex) {
                this.transitionDirection = 'right'
            } else {
                this.transitionDirection = 'left'
            }
            this.openTab = this.profileTabs[tab]
            this.$router.replace({
                name: this.profileTabs[tab].link
            })
            console.log(this.transitionDirection)
        }
    },
    mounted() {
        this.$emit('selectedNav', 2)
    }
    // beforeRouteLeave (to, from) {
    //     var toIndex = this.profileTabs.findIndex((tab)=>{
    //         return tab.link === to.name
    //     })
    //     var fromIndex = this.profileTabs.findIndex((tab)=>{
    //         return tab.link === from.name
    //     })
    //     if(toIndex > fromIndex) {
    //         this.transitionDirection = 'right'
    //     }else {
    //         this.transitionDirection = 'left'
    //     }
    //     console.log(this.transitionDirection)
    //     // next()
    // }
}
</script>
<style scoped>
.right-enter-from,
.left-leave-to {
    opacity: 0;
    transform: translateX(40px);
}

.right-leave-to,
.left-enter-from {
    opacity: 0;
    transform: translateX(-40px);
}

.right-enter-to,
.right-leave-from,
.left-leave-from,
.left-enter-to {
    opacity: 1;
    transform: translateX(0px);
}

.right-enter-active,
.right-leave-active,
.left-enter-active,
.left-leave-active {
    transition: all ease-in-out 0.5s;
}

.tab-btn {
    border: none;
    background: transparent;
    outline: none;
    transition: background 0.2s, color 0.2s;
}

.tab-btn:hover {
    background: #f3f4f6;
    color: var(--color-primary, #43AA84);
}

.tab-btn.text-primary {
    font-weight: 600;
    background: #f3f4f6;
}

.overflow-x-hidden {
    min-height: 500px;
    transition: min-height 0.3s;
}
</style>
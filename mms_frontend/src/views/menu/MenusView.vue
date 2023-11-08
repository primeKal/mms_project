<template>
    <div class="h-full">
        <p class="px-2 pt-2 pb-1 font-medium">Menu</p>
        <div class="flex overflow-x-scroll scrollbar-hide">
            <button
                v-for="section in menuSections"
                :key="section.id"
                @click="selectedSection=section.id"
                :class="{'text-primary border-primary': selectedSection === section.id}"
                class="outline-none py-2 px-4 text-black/70 border-b-4"
            >
                {{ section.name }}
            </button>
        </div>
        <div class="p-3 h-[62vh] overflow-y-scroll">
            <transition-group
                tag="div"
                class="flex flex-col w-full space-y-3"
            >
                <MenuItemVue 
                    v-for="menuItem in menuItems"
                    :key="menuItem.id"
                    :menuItem="menuItem"
                />
            </transition-group>
        </div>
        <OrderSummaryVue class="z-10 fixed bottom-0 inset-x-0 shadow-lg" />
    </div>
</template>
<script>
import MenuItemVue from '@/components/menu/MenuItem.vue'
import OrderSummaryVue from './OrderSummary.vue'
export default {
    components: {
        MenuItemVue,
        OrderSummaryVue,
    },
    data () {
        return {
            menuItems: [
                {'id': '1000', 'image': '/images/fish.jpg', 'name': 'rosotto', 'price': 235},
                {'id': '1002', 'image': '/images/hotdog.png', 'name': 'rosotto', 'price': 235},
                {'id': '1003', 'image': '/images/fruit.jpeg', 'name': 'rosotto', 'price': 235},
                {'id': '1004', 'image': '/images/fish.jpg', 'name': 'rosotto', 'price': 235},
                {'id': '1005', 'image': '/images/fruit.jpeg', 'name': 'rosotto', 'price': 235},
                // {'id': '1006', 'image': '/images/fish.jpg', 'name': 'rosotto', 'price': 235},
                // {'id': '1007', 'image': '/images/fruit.jpeg', 'name': 'rosotto', 'price': 235},
                // {'id': '1008', 'image': '/images/fish.jpg', 'name': 'rosotto', 'price': 235},
                // {'id': '1009', 'image': '/images/fruit.jpeg', 'name': 'rosotto', 'price': 235},
            ],
            menuSections: [
                {'id': '2000', 'name': 'Breakfast'},
                {'id': '2001', 'name': 'Lunch'},
                {'id': '2002', 'name': 'Dinner'},
                {'id': '2003', 'name': 'Drinks'},
            ],
            selectedSection: '',
        }
    },
    mounted () {
        this.selectedSection = this.menuSections[0].id
    }
}
</script>
<style>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
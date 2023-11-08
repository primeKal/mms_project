<template>
    <div class="relative">
        <p>Menu</p>
        <div class="mt-2 flex overflow-x-scroll ">
            <button
                v-for="section in menuSections"
                :key="section.id"
                @click="selectedSection=section.id"
                :class="{'text-primary border-primary': selectedSection=== section.id}"
                class="outline-none p-2 text-black/70 border-b"
            >
                {{ section.name }}
            </button>
        </div>
        <div class="py-2">
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
        <OrderSummaryVue class="absolute inset-b-0 inset-x-0 shadow-md" />
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
            ],
            menuSections: [
                {'id': '2000', 'name': 'breakfast'},
                {'id': '2001', 'name': 'lunch'},
                {'id': '2002', 'name': 'dinner'},
                {'id': '2003', 'name': 'drinks'},
            ],
            selectedSection: '',
        }
    }
}
</script>
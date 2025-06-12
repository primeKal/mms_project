<template>
  <div class="lg:py-3 py-0 flex lg:flex-col flex-row">
    <div class="px-3 lg:flex hidden items-center">
      <input :class="[collapse ? 'hidden' : 'block']" class="w-full mr-3 bg-gray-100 py-1 text-sm pl-3 rounded"
        type="text" placeholder="search" id="search" />
      <div class="p-2 rounded-full border shadow-lg cursor-pointer">
        <svg @click="collapse = !collapse" v-if="!collapse" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M11.92 19.92L4 12l7.92-7.92l1.41 1.42l-5.5 5.5H22v2H7.83l5.51 5.5l-1.42 1.42M4 12V2H2v20h2V12Z" />
        </svg>
        <svg @click="collapse = !collapse" v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
        </svg>
      </div>
    </div>
    <div
      class="lg:mt-8 mt-2 lg:w-auto w-full flex lg:flex-col flex-row  lg:snap-none snap-x snap-proximity touch-pan-x text-gray-800 overflow-scroll md:overflow-auto">
      <router-link v-for="nav in filteredNavItems" :key="nav.name" :to="{ name: nav.link }"
        class="lg:pl-4 pl-0 lg:py-3 py-2 w-full flex items-center lg:border-l-4 border-b-4 hover:bg-blue-200 text-nowrap snap-center"
        :class="[
          nav.id === navValue
            ? 'lg:border-l-blue-700 border-b-blue-700 bg-blue-200'
            : 'lg:border-l-white border-b-white',
        ]">
        <Icon class="lg:block hidden" :icon="nav.icon" />
        <label :class="[collapse ? 'hidden' : 'block']" class="ml-2 lg:text-base text-sm text-nowrap">{{ nav.name
          }}</label>
      </router-link>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
import { mapGetters } from "vuex";

export default {
  props: {
    navValue: Number,
  },
  components: {
    Icon,
  },
  computed: {
    ...mapGetters({
      menus: "Menu/getAllMenus",
      basicInfo: "User/getUser",
    }),
    filteredNavItems() {
      const userRoles = this.basicInfo?.roles || ['STAFF'];
      // Get all allowed menu IDs from all user roles
      const allowedMenuIds = userRoles.reduce((acc, role) => {
        const roleMenus = this.menuRoles[role?.name] || [];
        return [...new Set([...acc, ...roleMenus])]; // Remove duplicates
      }, []);
      return this.navItems.filter(item => allowedMenuIds.includes(item.id));
    }
  },
  data() {
    return {
      collapse: false,
      menuRoles: {
        Admin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All menus
        Company: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All menus
        Kitchen: [3, 4, 5, 8, 9, 10, 11], // All except menu management
        Inventory: [9, 10, 11], // Basic operational menus
        Waiter: [ 5], // Inventory related menus
        Cashier: [4, 5, 6, 7], // Procurement related menus
        Finance: [4, 5, 6, 7, 8, 9 , 10 , 11], // Procurement related menus
      },
      navItems: [
        {
          id: 1,
          name: "Dashboard",
          link: "dashboard",
          icon: "ic:round-space-dashboard",
        },
        { id: 2, name: "Profile", link: "company_information", icon: "mdi:chart-pie" },
        {
          id: 3,
          name: "Menu Management",
          link: "menu_management",
          icon: "ic:twotone-restaurant-menu",
        },
        {
          id: 8,
          name: "Products",
          link: "products",
          icon: "mdi:cart",
        },
        {
          id: 4,
          name: "Table Management",
          link: "table_management",
          icon: "ic:baseline-table-restaurant",
        },
        {
          id: 9,
          name: "Items",
          link: "items",
          icon: "ic:baseline-table-restaurant",
        },
        {
          id: 10,
          name: "Procurement",
          link: "procurement",
          icon: "ic:baseline-table-restaurant",
        },
        {
          id: 11,
          name: "Inventory",
          link: "inventory",
          icon: "ic:baseline-table-restaurant",
        },
        {
          id: 5,
          name: "Order Processing",
          link: "order_processing",
          icon: "ic:baseline-fastfood",
        },
        {
          id: 6,
          name: "Payment",
          link: "payments",
          icon: "ic:baseline-payments",
        },
        {
          id: 7,
          name: "Payment Options",
          link: "methods",
          icon: "uim:analytics",
        },
      ],
    };
  },
  methods: {
    async initialization() {
      console.log(this.basicInfo, 'in nav');
      await this.fetchMenus(this.basicInfo.company.id);
      this.loading = false;
    },
  },
  watch: {
    collapse(value) {
      this.$emit("collapse", value);
    },
  },
  async mounted() {
    this.initialization();
  },
};
</script>

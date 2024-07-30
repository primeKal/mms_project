<template>
  <MainRendererVue :loading="loading">
    <QRCodeModalVue
      v-if="openQRView"
      :companyInfo="openQRView"
      :qrValue="`https://mms-project.onrender.com/menu/${this.$store.state.Company.companyInfo.id}/table/2`"
      @closeModal="() => (openQRView = null)"
    />

    <DeleteConfirmationModalVue
      v-if="openDelete"
      :title="openDelete.name"
      :id="openDelete.id"
      @deleteItem="deleteMenu"
      @closeModal="openDelete = null"
    />

    <div class="xl:p-6 p-2 xl:pr-12 pr-2 w-full">
      <h3 class="text-primary font-medium text-xl">Menu List</h3>
      <div class="xl:mt-4 mt-2 w-full flex xl:flex-row flex-col xl:justify-between justify-auto">
        <SearchBarVue
          class="xl:w-2/3 w-full"
          :placeholderString="'Search menus'"
          @searchChanged="searchCategories"
        />
        <button
          @click="openNewMenu = true"
          :disabled="openNewMenu"
          class="xl:w-1/5 xl:mt-0 mt-2 xl:self-auto self-end bg-transparent hover:bg-primary text-primary hover:text-white border-primary rounded border active:scale-95 transition-all"
        >
          + NEW MENU
        </button>
      </div>
      <table class="xl:mt-6 mt-3 w-full">
        <thead class="bg-gray-100 border-y shadow-sm">
          <th class="py-2 xl:pl-4 pl-1 xl:text-base text-sm text-left">Menu No.</th>
          <th class="py-2 xl:pl-4 pl-1 xl:text-base text-sm text-left">Menu Name</th>
          <th class="py-2 xl:pl-4 pl-1 xl:text-base text-sm text-left">Status</th>
          <th class="py-2 xl:pl-4 pl-1 xl:text-base text-sm text-center">Actions</th>
        </thead>
        <tbody>
          <!-- create menu start -->
          <transition
            enter-from-class="h-0"
            enter-to-class="h-auto"
            enter-active-class="transition-all duration-500"
            leave-from-class="h-auto"
            leave-to-class="h-0"
            leave-active-class="transition-all duration-500"
          >
            <tr class="border-2 border-primary rounded-lg" v-if="openNewMenu">
              <td class="xl:pl-4 pl-1 xl:text-base text-sm py-1">New</td>
              <td class="xl:pl-4 pl-1 xl:text-base text-sm py-2">
                <input
                  class="py-1 pl-1 rounded border"
                  v-model="newMenu.name"
                />
              </td>
              <td class="sm:block hidden"></td>
              <td class="flex justify-center items-center xl:space-x-3 space-x-1 xl:pl-4 pl-0 py-2">
                <button
                  @click="openNewMenu = false"
                  class="py-1 xl:px-4 px-2 xl:text-base text-sm text-gray-400 hover:text-gray-500 active:scale-95 transition-all font-semibold rounded"
                >
                  cancel
                </button>
                <button
                  @click="createMenu"
                  class="py-1 xl:px-4 px-2 xl:text-base text-sm text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all font-semibold rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          </transition>
          <!-- create menu end -->
          <tr
            v-for="menu in menus"
            :key="menu.id"
            class="hover:bg-slate-50/60 border-b transition-colors"
          >
            <td class="xl:pl-4 pl-1 xl:py-3 xl:text-base text-sm font-light">{{ menu.id }}</td>
            <td class="xl:pl-4 pl-1 xl:py-3 xl:text-base text-sm font-light">{{ menu.name }}</td>
            <td
              :class="[menu.isActive ? 'text-green-600' : 'text-red-600']"
              class="xl:pl-4 pl-1 xl:py-3 xl:text-base text-sm font-light"
            >
              {{ menu.isActive ? 'Active': 'Inactive' }}
            </td>
            <td class="pl-4 py-3 flex justify-center items-center">
              <svg
                @click="setQRinfo(menu)"
                class="p-1 hover:border rounded hover:text-blue-400 cursor-pointer transition-all"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2zm0 16H5V7h14v12zm-7-8.5c1.84 0 3.48.96 4.34 2.5c-.86 1.54-2.5 2.5-4.34 2.5s-3.48-.96-4.34-2.5c.86-1.54 2.5-2.5 4.34-2.5M12 9c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4zm0 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
                />
              </svg>
              <svg
                @click="editMenu(menu)"
                class="p-1 hover:border rounded hover:text-yellow-400 cursor-pointer transition-all"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"
                />
              </svg>
              <svg
                @click="openDelete = menu"
                class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer transition-all"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </MainRendererVue>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import MainRendererVue from "@/layout/MainRenderer.vue";
import SearchBarVue from "@/components/fields/SearchBar.vue";
import QRCodeModalVue from "@/components/qr_code/QRCodeModal.vue";
import DeleteConfirmationModalVue from "@/components/modals/DeleteConfirmationModal.vue";
export default {
  components: {
    MainRendererVue,
    SearchBarVue,
    QRCodeModalVue,
    DeleteConfirmationModalVue,
  },
  data() {
    return {
      loading: true,
      newMenu: {
        name: "",
      },
      openNewMenu: false,
      openQRView: null,
      openDelete: null,
    };
  },
  computed: {
    ...mapGetters({
      menus: "Menu/getAllMenus",
      basicInfo: "Company/getCompanyInfo",
    }),
  },
  methods: {
    ...mapActions({
      fetchMenus: "Menu/fetchAllMenus",
      removeMenu: "Menu/removeMenu",
    }),
    async initialization() {
      await this.fetchMenus(this.basicInfo.id);
      this.loading = false;
    },
    searchCategories(searchString) {
      console.log(searchString);
      // do the search
    },
    searchMenuItem(searchString) {
      console.log(searchString);
    },
    setQRinfo(menu) {
      console.log(this.basicInfo);
      this.openQRView = {
        logo: "/images/restaurant_logo.png",
        menu: {
          id: menu.id,
          name: menu.name,
        },
        primaryColor: "#43AA84",
        secondaryColor: "#000000",
      };
      console.log(this.openQRView);
    },
    async createMenu() {
      this.loading = true;
      if (this.newMenu.name.length > 0) {
        const status = await this.$store.dispatch(
          "Menu/addNewMenu",
          this.newMenu
        );
        if (status.success) {
          this.$toast.success("New Menu created");
          this.openNewMenu = false;
          this.newMenu.name = "";
        } else {
          this.$toast.error("Error creating menu");
        }
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    editMenu(menu) {
      this.$store.commit("Menu/setMenuId", menu.id);
      this.$router.push({ name: "edit_menu", params: { name: menu.name } });
    },
    async deleteMenu(id) {
      const status = await this.removeMenu(id);
      if (status.success) {
        this.$toast.success("Menu deleted successfully");
        this.openDelete = null;
      } else {
        this.$toast.error("Error occured");
      }
    },
  },
  async mounted() {
    this.loading = true;
    this.$emit("selectedNav", 3);
    this.loading = false;
    this.initialization();
  },
};
</script>

<template>
  <DeleteConfirmationModalVue
    v-if="openDeleteCategory"
    :title="openDeleteCategory.name"
    :id="openDeleteCategory.id"
    @deleteItem="deleteSection"
    @closeModal="openDeleteCategory = null"
  />

  <tr
    :class="
      openProducts
        ? 'shadow-md bg-primary text-white'
        : 'bg-white text-black shadow-none hover:bg-slate-50/60'
    "
    class="grid grid-cols-3 lg:gap-4 gap-2 auto-cols-min justify-between border-b lg:text-base text-sm transition-colors"
  >
    <td class="lg:pl-4 pl-2 py-3 flex items-center font-light">
      <svg
        class="lg:mr-3 mr-2"
        @click="openProducts = !openProducts"
        :class="[openProducts ? 'rotate-180' : 'rotate-0']"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
        />
      </svg>
      <p v-if="!editSection">{{ category.name }}</p>
      <input
        v-else
        class="py-1 lg:px-2 px-1 rounded border"
        v-model="sectionInfo.name"
      />
    </td>
    <td class="pl-2 py-3 font-light truncate">
      <p v-if="!editSection">{{ category.description }}</p>
      <textarea
        v-else
        style="resize: none"
        class="border rounded h-20 p-1"
        v-model="sectionInfo.description"
      ></textarea>
    </td>
    <td
      v-if="!editSection"
      class="lg:pl-4 pl-2 lg:py-3 py-2 flex justify-center items-center"
    >
      <svg
        @click="editSection = true"
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
        @click="openDeleteCategory = category"
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
    <td
      v-else
      class="pl-1 py-2 flex lg:flex-row flex-col justify-center lg:items-center items-start"
    >
      <button
        @click="editSection = false"
        class="py-1 px-4 text-gray-400 hover:text-gray-500 active:scale-95 transition-all font-semibold rounded"
      >
        cancel
      </button>
      <button
        @click="updateSection"
        class="lg:mt-0 mt-2 py-1 px-4 text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all font-semibold rounded"
      >
        Save
      </button>
    </td>
    <!-- view all products under section -->
    <transition
      enter-from-class="h-0"
      enter-to-class="h-auto"
      enter-active-class="transition-all"
      leave-from-class="h-auto"
      leave-to-class="h-0"
      leave-transiton="transition-all"
    >
      <td
        v-if="openProducts"
        class="col-span-full grid p-4 bg-slate-100 text-black shadow-inner"
      >
        <p class="mb-1">Products:</p>
        <VueMultiselect
          placeholder="Select products to add to this section"
          tag-placeholder="Add new product"
          :taggable="true"
          track-by="name"
          @tag="openAddDialogue"
          label="name"
          :options="products"
          :searchable="true"
          :multiple="false"
          @select="addProduct"
        />
        <div class="xl:mt-4 mt-2 pb-5 bg-white text-black rounded-lg">
          <div v-if="newProducts.length > 0">
            <ProductRowVue
              v-for="product in newProducts"
              :product="product"
              :key="product.name"
              :index="-1"
            />
          </div>
          <ProductRowVue
            v-for="(product, index) in category.products"
            :key="product.id"
            :product="product"
            :index="index"
            @loading="
              (value) => {
                $emit('loading', value);
              }
            "
          />
          <AddProductVue
            :categoryId="parseInt(category.id)"
            v-model:openAddProduct="openAddProduct"
            :newProductName="newProductName"
            @loading="
              (value) => {
                $emit('loading', value);
              }
            "
          />
        </div>
      </td>
    </transition>
  </tr>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import "vue-multiselect/dist/vue-multiselect.css";
import VueMultiselect from "vue-multiselect";
import DeleteConfirmationModalVue from "@/components/modals/DeleteConfirmationModal.vue";
import ProductRowVue from "./ProductRow.vue";
import AddProductVue from "./AddProduct.vue";
export default {
  props: {
    category: Object,
  },
  components: {
    VueMultiselect,
    DeleteConfirmationModalVue,
    ProductRowVue,
    AddProductVue,
  },
  data() {
    return {
      newProducts: [],
      allProducts: [],
      openProducts: false,
      editSection: false,
      sectionInfo: {},
      openDeleteCategory: null,
      openAddProduct: false,
      newProductName: "",
    };
  },
  watch: {
    editSection(value) {
      if (value) {
        this.sectionInfo = this.category;
      }
    },
  },
  computed: {
    ...mapState({
      fetchedProducts: "Menu/getAllProducts",
    }),
    ...mapGetters({
      products: "Product/getAllProducts",
    }),
  },
  methods: {
    ...mapActions({
      changeSection: "Menu/updateSection",
      removeSection: "Menu/removeSection",
    }),
    async updateSection() {
      if (this.sectionInfo.name.length > 0) {
        this.$emit("loading", true);
        const status = await this.changeSection(this.sectionInfo);
        if (status.success) {
          this.$toast.success("Section updated");
          this.editSection = false;
          this.openProducts = false;
        } else {
          this.$toast.error("Error creating section");
        }
        setTimeout(() => {
          this.$emit("loading", false);
        }, 1000);
      } else {
        this.$toast.warning("Enter section name");
      }
    },
    async deleteSection(id) {
      const status = await this.$store.dispatch("Menu/removeSection", id);
      if (status.success) {
        this.$toast.success("Section deleted successfully");
      } else {
        this.$toast.error("Error deleteing section");
      }
      setTimeout(() => {
        this.openDeleteCategory = null;
      }, 1000);
    },
    async addProduct(productName) {
      console.log(this.newProducts, productName);
      const productInfo = {
        name: productName.name,
        description: "New Product",
        price: 0,
      };
      this.newProducts.push({ ...productInfo });
      console.log(this.newProducts);
    },
    openAddDialogue(productName) {
      this.newProductName = productName;
      this.openAddProduct = true;
      console.log(productName);
    },
  },
  async mounted() {
    let companyId = this.$store.state.Company.companyInfo.id;
    await this.$store.dispatch("Product/fetchAllProducts", companyId);
    this.loading = false;
  },
};
</script>

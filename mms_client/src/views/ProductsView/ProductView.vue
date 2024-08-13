<template>
  <MainRendererVue :loading="loading">
    <div class="p-6 pr-12 w-full">
      <AddProductDialogue v-if="addProduct" @closeModal="closeModal" :isEdit="isEdit" :editProduct="editProduct" />
      <h3 class="text-primary font-medium text-xl">Products</h3>
      <div class="mt-8 w-full flex justify-between">
        <div class="flex justify-between w-3/5">
          <SearchBarVue class="w-3/5" :placeholderString="'Search by Product number'" @searchChanged="searchProducts" />
          <fieldset class="-mt-1 w-1/3 border rounded">
            <legend class="ml-3 text-xs px-1">Product Status</legend>
            <select class="w-full pt-1 pb-1 px-2 outline-none">
              <option>All</option>
              <!-- <option>Free</option>
              <option>Ocuppied</option> -->
            </select>
          </fieldset>
        </div>
        <button @click="openNewProductModal()"
          class="w-1/5 bg-transparent hover:bg-primary text-primary hover:text-white border-primary rounded border active:scale-95 transition-all">
          + New Product
        </button>
      </div>
      <ProductList class="mt-5" :products="products" @editProduct="(Product) => {

        this.editProduct = Product;
        this.isEdit = true;
        this.addProduct = true;
      }
        " />
    </div>
  </MainRendererVue>
</template>
<script>
import { mapGetters } from "vuex";

import MainRendererVue from "@/layout/MainRenderer.vue";
import SearchBarVue from "@/components/fields/SearchBar.vue";
// import ProductList from "./ProductsList.vue";
import ProductList from "./ProductList.vue";
import AddProductDialogue from "./AddProductDialogue.vue";
export default {
  components: {
    MainRendererVue,
    SearchBarVue,
    ProductList,
    AddProductDialogue
  },
  data() {
    return {
      loading: true,
      addProduct: false,
      isEdit: false,
      editProduct: null
    };
  },
  computed: {
    ...mapGetters({
      products: "Product/getAllProducts",
    }),
  },
  methods: {
    searchProducts(searchString) {
      console.log(searchString);
    },
    async closeModal() {
      this.loading = true;
      this.addProduct = false;
      let companyId = this.$store.state.Company.companyInfo.id;
      await this.$store.dispatch("Product/fetchAllProducts", companyId);
      this.loading = false;
    },
    openNewProductModal(){
      this.isEdit = false
      this.editProduct = null
      this.addProduct = true
    }
  },
  async mounted() {
    this.$emit("selectedNav", 8);
    // console.log(this.$store.state)
    let companyId = this.$store.state.Company.companyInfo.id;
    await this.$store.dispatch("Product/fetchAllProducts", companyId);
    this.loading = false;
  },
};
</script>

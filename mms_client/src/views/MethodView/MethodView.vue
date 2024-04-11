<template>
    <MainRendererVue :loading="loading">
      <div class="p-6 pr-12 w-full">
        <h3 class="text-primary font-medium text-xl">Payment Methods</h3>
        <div class="mt-8 w-full flex justify-between">
          <div class="flex justify-between w-3/5">
            <SearchBarVue
              class="w-3/5"
              :placeholderString="'Search by Method number'"
              @searchChanged="searchMethods"
            />
            <fieldset class="-mt-1 w-1/3 border rounded">
              <legend class="ml-3 text-xs px-1">Method Status</legend>
              <select class="w-full pt-1 pb-1 px-2 outline-none">
                <option>All</option>
                <option>Free</option>
                <option>Ocuppied</option>
              </select>
            </fieldset>
          </div>
        </div>
        <MethodList
          class="mt-5"
          :Methods="[]"
          @editMethod="
            (Method) => {
              editMethod = Method;
            }
          "
        />
      </div>
    </MainRendererVue>
  </template>
  <script>
  import { mapGetters } from "vuex";
  
  import MainRendererVue from "@/layout/MainRenderer.vue";
  import SearchBarVue from "@/components/fields/SearchBar.vue";
  // import MethodList from "./MethodsList.vue";
  import MethodList from "./MethodList.vue";
  export default {
    components: {
      MainRendererVue,
      SearchBarVue,
      MethodList,
    },
    data() {
      return {
        loading: true,
      };
    },
    computed: {
      ...mapGetters({
        Methods: "Method/getMethods",
      }),
    },
    methods: {
      searchMethods(searchString) {
        console.log(searchString);
      },
    },
    async mounted() {
      this.$emit("selectedNav", 7);
      await this.$store.dispatch("Method/fetchAllMethods");
      this.loading = false;
    },
  };
  </script>
  
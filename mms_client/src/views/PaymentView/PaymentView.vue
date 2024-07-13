<template>
  <MainRendererVue :loading="loading">
    <div class="p-6 pr-12 w-full">
      <h3 class="text-primary font-medium text-xl">Payments</h3>
      <div class="mt-8 w-full flex justify-between">
        <div class="flex justify-between w-3/5">
          <SearchBarVue
            class="w-3/5"
            :placeholderString="'Search by Payment number'"
            @searchChanged="searchPayments"
          />
          <fieldset class="-mt-1 w-1/3 border rounded">
            <legend class="ml-3 text-xs px-1">Payment Status</legend>
            <select class="w-full pt-1 pb-1 px-2 outline-none">
              <option>All</option>
              <option>Free</option>
              <option>Ocuppied</option>
            </select>
          </fieldset>
        </div>
      </div>
      <PaymentList
        class="mt-5"
        :payments="Payments"
        @editPayment="
          (Payment) => {
            editPayment = Payment;
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
// import PaymentList from "./PaymentsList.vue";
import PaymentList from "./PaymentList.vue";
export default {
  components: {
    MainRendererVue,
    SearchBarVue,
    PaymentList,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      Payments: "Payments/getAllPayments",
    }),
  },
  methods: {
    searchPayments(searchString) {
      console.log(searchString);
    },
  },
  async mounted() {
    this.$emit("selectedNav", 6);
    // console.log(this.$store.state)
    let companyId = this.$store.state.Company.companyInfo.id;
    await this.$store.dispatch("Payments/fetchAllPayments", companyId);
    this.loading = false;
    console.log("kdkdkdkd", this.Payments)
  },
};
</script>

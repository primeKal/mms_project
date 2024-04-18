<template>
  <ModalLayoutVue>
    <div class="w-1/2 p-8 bg-white rounded-xl">
      <div class="w-full flex justify-between">
        <h2>Add Table</h2>
        <div @click="$emit('closeModal')">CLOSE X</div>
      </div>
      <form
        @submit.prevent="createTable"
        class="mt-6 px-2 flex flex-col space-y-3"
      >
        <fieldset
          :class="v$.paymentMethodInfo.name.$error ? 'border-red-500' : ''"
          class="w-full border rounded"
        >
          <legend class="ml-3 text-xs px-1">Payment Method name</legend>
          <input
            @input="setTouched('name')"
            type="text"
            class="w-full pt-1 pb-1 px-2 outline-none"
            v-model="paymentMethodInfo.name"
          />
        </fieldset>
        <div
          v-for="error of v$.paymentMethodInfo.name.$errors"
          :key="error.$uid"
          class="-mt-2 text-red-500"
        >
          {{ error.message }}
        </div>
        <fieldset
          class="w-full border rounded"
          :class="v$.paymentMethodInfo.type.$error ? 'border-red-500' : ''"
        >
          <legend class="ml-3 text-xs px-1">Method Type</legend>
          <select
            class="w-full pt-1 pb-1 px-2 outline-none"
            v-model="paymentMethodInfo.type"
          >
            <option value="">Select a method type</option>
            <option value="Chapa">Chapa</option>
            <option value="SantimPay">Santim Pay</option>
            <option value="Telebirr">Telebirr</option>
          </select>
        </fieldset>
        <div
          v-for="error of v$.paymentMethodInfo.type.$errors"
          :key="error.$uid"
          class="-mt-2 text-red-500"
        >
          {{ error.message }}
        </div>
        <fieldset
          :class="v$.paymentMethodInfo.isActive?.$error ? 'border-red-500' : ''"
          class="w-full border rounded"
        >
          <legend class="ml-3 text-xs px-1">Status</legend>
          <select
            class="w-full pt-1 pb-1 px-2 outline-none"
            v-model="paymentMethodInfo.isActive"
          >
            <option value="true">ON</option>
            <option value="false">OFF</option>
          </select>
        </fieldset>
        <div
          v-for="error of v$.paymentMethodInfo.isActive.$errors"
          :key="error.$uid"
          class="-mt-2 text-red-500"
        >
          {{ error.message }}
        </div>
        <button
          type="submit"
          class="py-2 mt-2 self-center flex justify-center items-center w-2/3 bg-primary text-white active:scale-95 rounded font-semibold"
        >
          <svg
            v-if="loading"
            class="mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
              opacity=".5"
            />
            <path
              fill="currentColor"
              d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
            >
              <animateTransform
                attributeName="transform"
                dur="1s"
                from="0 12 12"
                repeatCount="indefinite"
                to="360 12 12"
                type="rotate"
              />
            </path>
          </svg>
          SUBMIT
        </button>
      </form>
    </div>
  </ModalLayoutVue>
</template>
<script>
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import ModalLayoutVue from "@/layout/ModalLayout.vue";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  props: {
    isNew: Boolean,
    editTable: Object,
  },
  components: {
    ModalLayoutVue,
  },
  data() {
    return {
      paymentMethodInfo: {
        name: "",
        isActive: "",
        type: "",
      },
      loading: false,
    };
  },
  validations() {
    return {
      paymentMethodInfo: {
        name: {
          required,
        },
        type: {
          required,
        },
        isActive: {
          required,
        },
      },
    };
  },
  methods: {
    setTouched(theModel) {
      if (theModel == "name" || theModel == "all") {
        this.v$.paymentMethodInfo.name.$touch();
      }
      if (theModel == "type" || theModel == "all") {
        this.v$.paymentMethodInfo.type.$touch();
      }
    },
    ...mapActions({
      addTable: "Method/addNewMethod",
      updateTable: "METHOD/updateMethod",
    }),
    async createTable() {
      // validation required
      this.setTouched("all");
      if (!this.v$.$invalid) {
        this.loading = true;
        if (this.isNew) {
          console.log(this.paymentMethodInfo);
          let companyId = this.$store.state.Company.companyInfo.id;
          console.log(companyId);
          this.paymentMethodInfo.companyId = companyId
          console.log("hii kaleb", this.paymentMethodInfo)
          const status = await this.addTable(this.paymentMethodInfo);
          if (status.success) {
            this.$toast.success("Payment Method created successfully");
            setTimeout(() => {
              this.$emit("closeModal");
            }, 1000);
          } else {
            this.$toast.error("Payment Method creation failed");
          }
        } else {
          const status = await this.updateTable(this.paymentMethodInfo);
          if (status.success) {
            this.$toast.success("Table updated successfully");
            setTimeout(() => {
              this.$emit("closeModal");
            }, 1000);
          } else {
            this.$toast.error("Table update failed");
          }
        }
        this.loading = false;
      }
    },
  },
  mounted() {
    if (!this.isNew) {
      this.paymentMethodInfo = this.editTable;
    }
  },
};
</script>

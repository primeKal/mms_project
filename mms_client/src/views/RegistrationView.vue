<template>
  <div
    class="h-screen w-full flex flex-col justify-center items-center bg-white border-dark p-5"
  >
    <div class="w-full md:w-2/3 lg:w-1/3 p-5 flex flex-col bg-slate-100 rounded-lg shadow-lg">
      <div class="flex flex-col justify-center items-center">
        <img src="/zeus.png" alt="Logo" class="w-[230px] h-[230px]" />
      </div>
      <!-- <h2 class="font-semibold text-2xl bg-skin-primary">Create New Account</h2> -->
      <h6 class="font-light text-black/70">Sign up here</h6>
      <div class="mt-1 flex flex-col">
        <input
          class="mt-3 py-2 pl-2 rounded border"
          placeholder="name"
          type="text"
          v-model.trim="account.name"
        />

        <input
          class="mt-3 py-2 pl-2 rounded border"
          placeholder="username"
          type="text"
          v-model.trim="account.username"
        />

        <input
          class="mt-3 py-2 pl-2 rounded border"
          placeholder="moto"
          type="text"
          v-model.trim="account.moto"
        />

        <input
          class="mt-3 py-2 pl-2 rounded border"
          placeholder="Email"
          type="Email"
          v-model.trim="account.email"
        />

        <input
          class="mt-3 py-2 pl-2 rounded border"
          placeholder="Password"
          type="password"
          v-model.trim="account.password"
        />
      </div>

      <button
        @click="createAccount"
        class="mt-7 py-2 flex justify-center bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-xl active:scale-95"
      >
        <svg
          v-if="loading"
          class="self-center"
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
        <p v-else class="self-center">Sign up</p>
      </button>
      <div class="mt-5 flex justify-between">
        <a href="/" class="text-xs text-blue-400 hover:underline cursor-pointer"
          >Already have an account.</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      // v$: useVuelidate(),
      account: {
        name: "",
        username: "",
        email: "",
        moto: "",
        password: "",
      },
      loading: false,
    };
  },
  validations() {
    return {
      account: {
        name: { required },
        username: { required },
        email: { required, email },
        moto: { required },
        password: { required },
      },
    };
  },
  methods: {
    async createAccount() {
      this.loading = true;
      // validate entry
      await this.v$.$validate();
      if (!this.v$.$error) {
        const status = await this.$store.dispatch(
          "Company/createAccount",
          this.account
        );
        if (status) {
          this.$toast.success("New account created.");
          this.$router.replace({ name: "dashboard" });
        } else {
          this.$toast.error("Operation failed!");
        }
      } else
        this.$toast.error(
          "[" +
            this.v$.$errors[0].$property +
            "] " +
            this.v$.$errors[0].$message.toLocaleLowerCase()
        );
      this.loading = false;
    },
  },
};
</script>

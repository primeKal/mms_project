<template>
  <ModalLayoutVue>
    <div class="w-[98%] md:w-1/2  p-8 bg-white rounded-xl">
      <div class="w-full flex justify-between">
        <h2>Add Product</h2>
        <div @click="$emit('closeModal')">CLOSE X</div>
      </div>
      <form @submit.prevent="createProduct" class="mt-6 px-2 flex flex-col space-y-3">
        <fieldset class="w-full border rounded">
          <!-- <legend class="ml-3 text-xs px-1">Product name</legend> -->
          <div class="m-4 flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label>Product Name</label>
              <input v-model="name" type="text" aria-label="Product Name"
                class="w-full pt-1 pb-1 px-2 text-black transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed" />
            </div>
            <div class="flex flex-col gap-2">
              <label>Product Description</label>
              <textarea v-model="description" type="text" rows="3"
                class="w-full pt-1 pb-1 px-2 text-black transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed" />
            </div>
            <div class="flex flex-col gap-2">
              <label>Price</label>
              <input v-model="price" type="number" placeholder="Product Price"
                class="w-full pt-1 pb-1 px-2 text-black transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed" />
            </div>
            <div class="flex flex-col gap-2">
              <label>Product Image</label>
              <input type="file" @change="onFileUpload"
                class="w-full pt-1 pb-1 px-2 text-black transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed" />
            </div>
          </div>
        </fieldset>
        <button type="submit"
          class="py-2 mt-2 self-center flex justify-center items-center w-2/3 bg-primary text-white active:scale-95 rounded font-semibold">
          <svg v-if="loading" class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
              opacity=".5" />
            <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
              <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite"
                to="360 12 12" type="rotate" />
            </path>
          </svg>
          SUBMIT
        </button>
      </form>
    </div>
  </ModalLayoutVue>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from '@vuelidate/validators'


import ModalLayoutVue from "@/layout/ModalLayout.vue";
import baseAPI from "@/services/base";
import storage from "@/services/Firebase.js";
import { ref, uploadBytes } from "firebase/storage";

import Compressor from "compressorjs";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  components: {
    ModalLayoutVue,
  },
  props: {
        isEdit: Boolean,
        editProduct: Object
    },
  data() {
    return {
      name: "",
      description: "",
      img: null,
      price: 0,
      loading: false,
    };
  },
  validations() {
    return {
      name: {
        required
      },
      description: {
        required
      },
      // picture: {
      //   required
      // },
      price: {
        required
      },
    };
  },
  methods: {
    onClose() {
      this.$emit('closeModal');
    },
    onFileUpload(event) {
      this.img = event.target.files[0]
    },
    async createProduct() {
      this.loading = true
      let payload = {
        name: this.name,
        description: this.description,
        price: this.price
      };
      if (this.img) {
        await new Compressor(this.img, {
          quality: 0.6, // Set the desired quality level (0 to 1)
          maxWidth: 800, // Set the maximum width (optional)
          maxHeight: 600, // Set the maximum height (optional)
          success: (compressedFile) => {
            // Handle the compressed file, e.g., upload it to a server
            const storageRef = ref(storage, 'product-images/' + compressedFile.name);
            uploadBytes(storageRef, compressedFile).then(async (snapshot) => {
              console.log("Image upload successfull", snapshot);
              payload["image"] = `https://firebasestorage.googleapis.com/v0/b/mms-image-storage.appspot.com/o/product-images%2F${compressedFile.name}?alt=media`;

              baseAPI.post("product", payload).then(() => {
                alert("Product Added Successfully")
                this.onClose();
                this.loading = false
              }).catch((err) => {
                alert(err.response.data.message ?? err.message)
                this.loading = false
              })
            })
          },
          error: (error) => {
            console.log(error.message)
            this.$toast.error("Error occured creating product");
            this.loading = false
          }
        })
      } else {
        baseAPI.post("product", payload).then(() => {
          alert("Product Added Successfully")
          this.onClose();
          this.loading = false
        }).catch((err) => {
          alert(err.response.data.message ?? err.message)
          this.loading = false
        })
      }

    },
  },
  mounted () {
    console.log("on mounted")
    console.log(this.editProduct)
        if(this.isEdit) {
            this.name = this.editProduct?.name
            this.description = this.editProduct?.description
            this.price = this.editProduct?.price
        }
    }
};
</script>

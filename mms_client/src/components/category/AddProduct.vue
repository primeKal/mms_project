<template>
  <transition enter-from-class="scale-0" enter-to-class="scale-100" enter-active-class="transition-transform"
    leave-from-class="scale-100" leave-to-class="scale-0" leave-active-class="transition-transform" mode="out-in">
    <div v-if="!openAddProduct" class="mt-3 w-full flex items-center justify-center">
      <hr class="border w-20" />
      <button @click="toogleAdd(true)" class="mx-2 flex items-center text-black/70 hover:text-black">
        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m1 5h-2v4H7v2h4v4h2v-4h4v-2h-4V7Z" />
        </svg>
        Add New product
      </button>
      <hr class="border w-20" />
    </div>
    <div v-else class="flex border rounded w-full py-5 px-10">
      <div class="">
        <label v-if="!newProduct.image" for="image_upload" class="text-black/60">
          <!-- profile image with plus button svg -->
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M13 19c0 .7.13 1.37.35 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v8.35c-.63-.22-1.3-.35-2-.35V5H5v14h8m.96-6.71l-2.75 3.54l-1.96-2.36L6.5 17h6.85c.4-1.12 1.12-2.09 2.05-2.79l-1.44-1.92M20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3Z" />
          </svg>
          <p class="text-xl">Product Image</p>
          <input @change="file_change" type="file" id="image_upload" style="display: none" accept="image/*" />
        </label>
        <div v-else class="flex flex-col items-center">
          <img class="h-[155px]" :src="imagePath" />
          <button @click="removeImage"
            class="mt-5 px-5 py-2 text-white hover:text-black font-semibold text-xl bg-transparent hover:bg-white border border-white rounded">
            Remove
          </button>
        </div>
      </div>
      <div class="ml-8 w-full flex flex-col space-y-2">
        <input class="py-1 pl-1 rounded border" placeholder="Product Name" v-model="newProduct.name" />
        <input class="py-1 pl-1 rounded border" placeholder="Product Price" type="number" v-model="newProduct.price" />
        <textarea style="resize: none" class="p-1 rounded border h-20" placeholder="Description"
          v-model="newProduct.description"></textarea>
        <div class="flex justify-end">
          <button @click="toogleAdd(false)"
            class="py-1 px-4 text-gray-400 bg-slate-50 hover:bg-gray-100 active:scale-95 transition-all font-semibold rounded">
            cancel
          </button>
          <button @click="createProduct(categoryId)"
            class="ml-3 py-1 px-4 text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all font-semibold rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Compressor from "compressorjs";
import storage from "@/services/Firebase.js";
import { ref, uploadBytes } from "firebase/storage";

export default {
  props: {
    categoryId: Number,
    openAddProduct: Boolean,
    newProductName: String,
  },
  emits: ["update:openAddProduct"],
  data() {
    return {
      newProduct: {
        name: this.newProductName,
        price: "",
        description: "",
        image: null,
        productCategoryId: null,
      },
      file: null,
      imagePath: "",
    };
  },
  watch: {
    newProductName(newVal) {
      this.newProduct.name = newVal;
    },
  },
  methods: {
    toogleAdd(value) {
      this.$emit("update:openAddProduct", value);
    },
    file_change(e) {
      this.file = e.target.files[0];
      this.imagePath = URL.createObjectURL(this.file);
      this.newProduct.image = this.file;
    },
    async compressImage() {
      let compressedImage
      await new Compressor(this.file, {
        quality: 0.6, // Set the desired quality level (0 to 1)
        maxWidth: 800, // Set the maximum width (optional)
        maxHeight: 600, // Set the maximum height (optional)
        success: (compressedFile) => {
          // Handle the compressed file, e.g., upload it to a server
          compressedImage = compressedFile;
          console.log(compressedFile);
        },
        error: (error) => {
          console.log(error.message)
        }
      })
      return compressedImage;
    },
    removeImage() { },
    async createProduct(categoryId) {
      // insert validation
      //    this.$emit('loading', true)
      this.newProduct.productCategoryId = categoryId;
      let status
      if (this.file) {
        await new Compressor(this.file, {
          quality: 0.6, // Set the desired quality level (0 to 1)
          maxWidth: 800, // Set the maximum width (optional)
          maxHeight: 600, // Set the maximum height (optional)
          success: (compressedFile) => {
            // Handle the compressed file, e.g., upload it to a server
            const storageRef = ref(storage, 'product-images/' + compressedFile.name);
            uploadBytes(storageRef, compressedFile).then(async (snapshot) => {
              console.log("Image upload successfull", snapshot);
              this.newProduct.image = `https://firebasestorage.googleapis.com/v0/b/mms-image-storage.appspot.com/o/product-images%2F${compressedFile.name}?alt=media`;
              status = await this.$store.dispatch(
                "Menu/createProduct",
                this.newProduct
              );
              console.log(status);
              if (status.success) {
                this.$toast.success("Product created successfully");
                this.openNewProduct = false;
                this.newProduct.name = "";
                this.newProduct.price = "";
                this.newProduct.description = "";
                this.newProduct.image = null;
              } else {
                this.$toast.error("Error occured creating product");
              }
            })
          },
          error: (error) => {
            console.log(error.message)
            this.$toast.error("Error occured creating product");
          }
        })
      } else {
        status = await this.$store.dispatch(
          "Menu/createProduct",
          this.newProduct
        );
        console.log(status);
        if (status.success) {
          this.$toast.success("Product created successfully");
          this.openNewProduct = false;
          this.newProduct.name = "";
          this.newProduct.price = "";
          this.newProduct.description = "";
          this.newProduct.image = null;
        } else {
          this.$toast.error("Error occured creating product");
        }
      }

      //    this.$emit('loading', false)
    },
  },
};
</script>

<template>
  <table class="w-full">
    <thead class="bg-slate-50 border-y shadow-sm">
      <th class="py-2 pl-4 text-left">Product No.</th>
      <th class="py-2 pl-4 text-left">Name</th>
      <th class="py-2 pl-4 text-left">Price</th>
      <th class="py-2 pl-4 text-left">Description</th>
      <th class="py-2 pl-4 text-center">Action</th>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        class="hover:bg-slate-50/60 border-b transition-colors"
      >
        <td class="pl-4 py-3 font-light">{{ product.id }}</td>
        <td class="pl-4 py-3 font-light">{{ product.name }}</td>
        <td class="pl-4 py-3 font-light">
          {{ product.price }}
        </td>
        <td class="pl-4 py-3 font-light">{{ product.description }}</td>

        <td class="pl-4 py-3 flex justify-center items-center"></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    products: Array,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

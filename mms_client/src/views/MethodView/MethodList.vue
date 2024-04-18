<template>
  <table class="w-full">
    <thead class="bg-slate-50 border-y shadow-sm">
      <th class="py-2 pl-4 text-left">Payment Method No.</th>
      <th class="py-2 pl-4 text-left">Name</th>
      <th class="py-2 pl-4 text-left">Type</th>
      <th class="py-2 pl-4 text-left">Status</th>
      <th class="py-2 pl-4 text-center">Action</th>
    </thead>
    <tbody>
      <tr
        v-for="method in methods"
        :key="method.id"
        class="hover:bg-slate-50/60 border-b transition-colors"
      >
        <td class="pl-4 py-3 font-light">{{ method.id }}</td>
        <td class="pl-4 py-3 font-light">{{ method.name }}</td>
        <td class="pl-4 py-3 font-light">
          {{ method.type }}
        </td>
        <td class="pl-4 py-3 font-light">
          {{ method.isActive }}
        </td>
        <td class="pl-4 py-3 flex justify-center items-center"></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    methods: Array,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

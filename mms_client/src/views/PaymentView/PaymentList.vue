<template>
  <table class="w-full">
    <thead class="bg-slate-50 border-y shadow-sm">
      <th class="py-2 pl-4 text-left">Payment No.</th>
      <th class="py-2 pl-4 text-left">Amount</th>
      <th class="py-2 pl-4 text-left">Method</th>
      <th class="py-2 pl-4 text-center">Action</th>
    </thead>
    <tbody>
      <tr
        v-for="payment in payments"
        :key="payment.id"
        class="hover:bg-slate-50/60 border-b transition-colors"
      >
        <td class="pl-4 py-3 font-light">{{ payment.id }}</td>
        <td class="pl-4 py-3 font-light">{{ payment.amount }}</td>
        <td class="pl-4 py-3 font-light">
          {{ payment.method?.name }}
        </td>
        <td class="pl-4 py-3 flex justify-center items-center"></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    payments: Array,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
    <table class="w-full">
        <thead class="bg-slate-50 border-y shadow-sm">
            <th class="py-2 pl-4 text-left">Order No.</th>
            <th class="py-2 pl-4 text-left">Table No.</th>
            <th class="py-2 pl-4 text-left">Customer Name</th>
            <th class="py-2 pl-4 text-left">Order Date</th>
            <th class="py-2 pl-4 text-left">Order Time</th>
            <th class="py-2 pl-4 text-left">Total Price</th>
            <th class="py-2 pl-4 text-left">Status</th>
            <th class="py-2 pl-4 text-center">Action</th>
        </thead>
        <tbody>
            <tr
                v-for="order in orders"
                :key="order.id"
                class="hover:bg-slate-50/60 border-b transition-colors"
            >
                <td class="pl-4 py-3 font-light">{{ order.id }}</td>
                <td class="pl-4 py-3 font-light">{{ order.table.id }}</td>
                <td class="pl-4 py-3 font-light">{{ order.name }}</td>
                <td class="pl-4 py-3 font-light">{{ order.date }}</td>
                <td class="pl-4 py-3 font-light">{{ order.date }}</td>
                <td class="pl-4 py-3 font-light">{{ order.price }}</td>
                <td class="pl-4 py-3 font-light">{{ order.status }}</td>
                <td class="py-3 flex justify-center items-center">
                    <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"/></svg>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: {
        orders: Array,
    }
}
</script>
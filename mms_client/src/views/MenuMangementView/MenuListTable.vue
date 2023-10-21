<template>
    <table class="w-full">
        <thead class="bg-slate-50 border-y shadow-sm">
            <th class="py-2 pl-4 text-left">Image</th>
            <th class="py-2 pl-4 text-left">Name</th>
            <th class="py-2 pl-2 text-left">Descripiton</th>
            <th class="py-2 pl-4 text-left">Price</th>
            <th class="py-2 pl-4 text-left">item</th>
            <th class="py-2 pl-4 text-left">Action</th>
        </thead>
        <tbody>
            <tr
                    v-for="item in menuItems"
                    :key="item.id"
                    class="hover:bg-slate-50/60 border-b transition-colors"
                >
                    <td class="pl-4 py-1 font-light">
                       <img class="h-16 w-16 object-cover object-center" :src="`/images/${item.image}`" /> 
                    </td>
                    <td class="pl-4 py-3 font-light">{{ item.name }}</td>
                    <td class="pl-2 py-3 font-light">{{ item.description }}</td>
                    <td class="pl-2 py-3 font-light">{{ $filter.formatPriceCurrency(item.price, 'ETB') }}</td>
                    <td class="pl-2 py-3 font-light">{{ item.category }}</td>
                    <td class="pl-4 py-3 flex items-center">
                        <svg class="p-1 hover:border rounded hover:text-yellow-400 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"/></svg>
                        <svg class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"/></svg>
                    </td>
                </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: {
        menuItems: Array,
    }
}
</script>
<template>
    <div class="p-6 pr-12 w-full h-screen">
        <div class="flex justify-between">
            <div>
                <h3 class="text-primary font-medium text-xl">Current Bill</h3>
                <th class="py-3 pl-3 font-medium text-left">{{ currentYear+ "/" + currentMonth}}</th>
                <th class="py-3 pl-3 font-medium text-left"> 24 Orders</th>
                <th class="mx-4 p-3 font-medium  text-l bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all"> 24 ETB</th>



            </div>
            <button
                class="py-2 px-5 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                Refresh
            </button>
        </div>
        <div>
            <h3 class="text-primary font-medium text-xl">Previous Payments</h3>
        </div>
        <table class="mt-10 w-full">
            <thead class="border-b">
                <th class="py-3 pl-3 font-medium text-left">Month</th>
                <th class="py-3 pl-3 font-medium text-left">Total Orders</th>
                <th class="py-3 pl-3 font-medium text-left">Total Amount</th>
                <th class="py-3 pl-3 font-medium text-left">Status</th>

            </thead>
            <tbody>
                <tr v-for="operation in operationHours" :key="operation.month" class="border-b hover:bg-slate-50">
                    <td class="pl-3 py-3 font-light">{{ operation.month }}</td>
                    <td class="pl-3 py-3 font-light">{{ operation.total_order }}</td>
                    <td class="pl-3 py-3 font-light">{{ operation.total_amount }}</td>
                    <td class="pl-3 py-3 font-light">{{ operation.status }}</td>

                    <td class="pl-3 py-3 flex justify-center items-center">
                        <svg class="p-1 hover:border rounded hover:text-yellow-400 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"
                                d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8" />
                        </svg>
                        <svg class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z" />
                        </svg>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { ref, computed } from 'vue';

export default {
    data() {
        return {
            operationHours: [
                { 'month': 'January', 'total_order': '23', 'total_amount': '2300', 'status': 'paid' },
                { 'month': 'February', 'total_order': '23', 'total_amount': '2300', 'status': 'paid' },
                { 'month': 'June', 'total_order': '23', 'total_amount': '2300', 'status': 'failed' },
                { 'month': 'August', 'total_order': '23', 'total_amount': '2300', 'status': 'paid' }
            ]
        }
    },
    setup() {
        const currentDate = ref(new Date());

        const currentMonth = computed(() => currentDate.value.getMonth() + 1); // Months are zero-based, hence adding 1
        const currentYear = computed(() => currentDate.value.getFullYear());

        return {
            currentMonth,
            currentYear
        };
    }

}
</script>
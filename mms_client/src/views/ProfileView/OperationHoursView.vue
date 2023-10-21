<template>
    <div class="p-6 pr-12 w-full h-screen">
        <div class="flex justify-between">
            <h3 class="text-primary font-medium text-xl">Operation Hours</h3>
            <button class="py-2 px-5 flex items-center bg-transparent hover:bg-primary text-primary hover:text-white border-primary  rounded border active:scale-95 transition-all">
                + Add
            </button>
        </div>
        <table class="mt-10 w-full">
            <thead class="border-b">
                <th class="py-3 pl-3 font-medium text-left">Day</th>
                <th class="py-3 pl-3 font-medium text-left">Time</th>
                <th class="py-3 pl-3 font-medium text-center">Action</th>
            </thead>
            <tbody>
                <tr 
                    v-for="operation in operationHours"
                    :key="operation.day"
                    class="border-b hover:bg-slate-50"
                >
                    <td class="pl-3 py-3 font-light">{{ operation.day }}</td>
                    <td class="pl-3 py-3 font-light">{{ operation.time }}</td>
                    <td class="pl-3 py-3 flex justify-center items-center">
                        <svg class="p-1 hover:border rounded hover:text-yellow-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"/></svg>
                        <svg class="ml-3 p-1 hover:border rounded hover:text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"/></svg>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            operationHours: [
                {'day': 'Monday - Thursday', 'time': '7:30 AM - 6:30 PM'},
                {'day': 'Friday - Saturday', 'time': '9:00 AM - 9:30 PM'},
                {'day': 'Sunday', 'time': '7:30 AM - 6:30 PM'}
            ]
        }
    }
}
</script>
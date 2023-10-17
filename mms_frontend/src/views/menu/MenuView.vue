<template>
    <div class="h-full p-7 bg-gradient-to-b from-emerald-100 to-emerald-200 text-sm">
        <div class="p-10 h-5/6 flex flex-col bg-white shadow-lg rounded-lg">
            <div class="flex justify-between">
                <select class="w-1/5 py-2 px-3 border rounded " placeholder="Select Menu">
                    <option disabled selected class="text-black/70">Select Menu</option>
                    <option>Primary Menu</option>
                </select>
                <button class="py-2 px-4 primary-button">
                    + Add Menu
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted () {
        this.$emit('select_nav', 1)
    }
}
</script>
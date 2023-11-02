<template>
    <div class="w-full flex justify-end">
        <p class="font-light text-xs">Rows per page:</p>
        <select
            @change="$emit('setPerPage', perPage)"
            v-model="perPage"
        >
            <option :selected="perPage === '10'" value="10">10</option>
            <option :selected="perPage === '25'" value="25">25</option>
            <option :selected="perPage === '50'" value="50">50</option>
            <option :selected="perPage === '100'" value="100">100</option>
        </select>
    </div>
</template>
<script>
export default {
    props: {
        per_page: String,
    },
    data () {
        return {
           perPage: this.per_page,
        }
    }
}
</script>
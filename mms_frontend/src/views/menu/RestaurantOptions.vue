<template>
    <div>
        <div class="flex flex-col space-y-4 w-full">
            <button @click="$router.push({ name: 'items' })"
                class="bg-primary text-white rounded-xl py-3 shadow-md hover:bg-primary-dark transition duration-300">
                Go To Menu
            </button>
            <a :href="companyInfo.website"
                class="bg-white text-primary border border-primary rounded-xl py-3 text-center shadow-md hover:bg-gray-100 transition duration-300">
                Go To Website
            </a>
        </div>

        <div class="flex flex-col items-start justify-start mt-6 w-full text-left text-gray-700">
            <p class="mt-2"><strong>Address:</strong> {{ companyInfo.address }}</p>
            <p class="mt-2"><strong>Contact:</strong> {{ companyInfo.contact_information }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            companyInfo: 'Company/getCompanyInfo',
        })
    }
}
</script>

<style scoped>
.bg-primary-dark {
    background-color: #2563eb;
    /* A darker shade of your primary color */
}
</style>
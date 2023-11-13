<template>
    <div class="lg:px-24 px-2 py-4 bg-white flex justify-between">
        <div class="basis-1/2 flex justify-between items-center">
            <button class="text-3xl text-primary font-semibold flex outline-none">
                <svg class="mr-3 text-black" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7m5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4Z"/></svg>
                QRmenu
            </button>
            <ul class="flex space-x-6">
                <li :class="[selectedSection == 1 ? 'text-black font-medium':'text-black/50 font-normal']">About Us</li>
                <li :class="[selectedSection == 2 ? 'text-black font-medium':'text-black/50 font-normal']">Pricing</li>
                <li :class="[selectedSection == 3 ? 'text-black font-medium':'text-black/50 font-normal']">Testimonials</li>
                <li :class="[selectedSection == 4 ? 'text-black font-medium':'text-black/50 font-normal']">Contact</li>
            </ul>
        </div>
        <div class="flex">
            <button class="ouline-none py-2 font-semibold">Login</button>
            <button class="xl:ml-10 lg:ml-5 ml-0 py-2 px-5 bg-secondary rounded-3xl text-white font-semibold">Sign up</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        selectedSection: Number,
    }
}
</script>
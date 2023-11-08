<template>
    <div>
        public page
        <div class="mt-10 flex space-x-5">
            <button class="py-3 px-6 bg-green-400 rounded text-white font-semibold">
                login
            </button>
            <button class="py-3 px-6 bg-green-400 rounded text-white font-semibold">
                signup
            </button>
            <button @click="$router.push('menu/2')" class="py-3 px-6 bg-green-400 rounded text-white font-semibold">
                menu page
            </button>
        </div>
    </div>
</template>
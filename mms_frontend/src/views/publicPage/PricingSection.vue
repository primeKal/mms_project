<template>
    <section class="py-16">
        <p class="text-center font-medium text-4xl">Choose A Plan<br /> That’s Right For You</p>
        <p class="mt-8 text-center text-black/60">Choose a plan that works best for you, feel free to contact us</p>
        <div class="mt-8  flex justify-center items-center ">
            <div class="flex shadow-md rounded-md overflow-hidden">
                <button @click="billPlan = 0"
                    :class="[billPlan == 0 ? 'bg-primary text-white' : 'bg-transparent text-black']" class="py-3 px-5 ">
                    Bill Monthly
                </button>
                <button @click="billPlan = 1"
                    :class="[billPlan == 1 ? 'bg-primary text-white' : 'bg-transparent text-black']" class="py-3 px-5 ">
                    Bill Yearly
                </button>
            </div>

        </div>
        <div class="mt-14 flex justify-around">
            <div class="w-1/5 py-4 px-5 shadow rounded-lg pb-4 bg-white hidden md:block">
                <p class="text-xl text-center">Free Plan</p>
                <p class="my-4 text-black/60 text-center">Coming soon with our free plan</p>
                <!-- <p class="text-center text-xl font-semibold"><sup class="text-black/60">$ </sup>0</p>
                <div class="mt-4 py-4 px-2  flex flex-col space-y-5 bg-gray-50 rounded text-sm">
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        2 Users
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        2 Files
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Public Share & Comments
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Chat Support
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        New income apps
                    </div>
                </div>                 -->
            </div>
            <div class="w-full md:w-1/5 py-4 px-5 shadow rounded-lg pb-16 -translate-y-6 bg-primary text-white">
                <p class="text-2xl text-center font-semibold">Normal</p>
                <p class="my-4 text-center">Experiment the power of infinite possibilities</p>
                <p class="text-center text-xl font-semibold"><sup class="text-white">{{ billPlan === 0 ? 'ETB ' + "2000" : 'ETB  ' + "20,000" }}</sup></p>
                <div class="mt-4 py-4 px-2  flex flex-col space-y-5 bg-white text-black rounded">
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" />
                        </svg>
                        Profile Management
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" />
                        </svg>
                        Product and Menu Management
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" />
                        </svg>
                        Unlimited amount of menu
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" />
                        </svg>
                        Order Management
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" />
                        </svg>
                        Payment Processing with CHAPA
                    </div>
                </div>
            </div>
            <div class="w-1/5 py-4 px-5 shadow rounded-lg pb-4 bg-white hidden md:block">
                <p class="text-xl text-center">Business</p>
                <p class="my-4 text-black/60 text-center">Coming soon with our business plan</p>
                <!-- <p class="text-center text-xl font-semibold"><sup class="text-black/60">$</sup>16</p>
                <div class="mt-4 py-4 px-2  flex flex-col space-y-5 bg-gray-50 rounded text-sm">
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        All the features of pro plan
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Account success Manager
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Single Sign-On (SSO)
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Co-conception program
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Collaboration-Soon
                    </div>
                </div>                 -->
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            billPlan: 0,
            selectedPlan: 0
        }
    }
}
</script>
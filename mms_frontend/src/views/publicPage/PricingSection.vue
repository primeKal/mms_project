<template>
    <section class="py-16">
        <p class="text-center font-medium text-4xl">Choose A Plan<br/> That’s Right For You</p>
        <p class="mt-8 text-center text-black/60">Choose a plan that works best for you, feel free to contact us</p>
        <div class="my-8  flex justify-center items-center ">
            <div class="flex shadow-md rounded-md overflow-hidden">
                <button 
                    @click="billPlan=0" 
                    :class="[billPlan == 0 ? 'bg-primary text-white': 'bg-transparent text-black']" 
                    class="py-3 px-5 "
                >
                    Bill Monthly
                </button>
                <button 
                    @click="billPlan=1" 
                    :class="[billPlan == 1 ? 'bg-primary text-white': 'bg-transparent text-black']"
                    class="py-3 px-5 "
                >
                    Bill Yearly
                </button>
            </div>
            
        </div>
        <div class="flex justify-around">
            <div :class="[selectedPlan == 1 ? 'pb-12 translate-y-10 bg-primary': 'pb-4 translate-y-0 bg-white']"  class="w-1/4 py-4 px-2 shadow rounded">
                <p class="text-xl text-center">Free</p>
                <p class="my-4 text-black/60 text-center">Have a go and test your superpowers</p>
                <p class="text-center text-xl font-semibold"><sup class="text-black/60">$</sup>0</p>
                <div :class="[selectedPlan == 1 ? 'bg-white': 'bg-late-50']" class="mt-4 flex flex-col space-y-3">
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        2 Users
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        2 Files
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Public Share & Comments
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Chat Support
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        New income apps
                    </div>
                </div>                
            </div>
            <div :class="[selectedPlan == 2 ? 'pb-12 translate-y-10 bg-primary': 'pb-4 translate-y-0 bg-white']"  class="w-1/4 py-4 px-2 shadow rounded">
                <p class="text-xl text-center">Pro</p>
                <p class="my-4 text-black/60 text-center">Experiment the power of infinite possibilities</p>
                <p class="text-center text-xl font-semibold"><sup class="text-black/60">$</sup>8</p>
                <div :class="[selectedPlan == 2 ? 'bg-white': 'bg-late-50']" class="mt-4 flex flex-col space-y-3">
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        4 Users
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        All apps
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Unlimited editable exports
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Folders and collaboration
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        All incoming apps
                    </div>
                </div>                
            </div>
            <div :class="[selectedPlan == 3 ? 'pb-12 translate-y-10 bg-primary': 'pb-4 translate-y-0 bg-white']"  class="w-1/4 py-4 px-2 shadow rounded">
                <p class="text-xl text-center">Business</p>
                <p class="my-4 text-black/60 text-center">Unveil new superpowers and join the Design Leaque</p>
                <p class="text-center text-xl font-semibold"><sup class="text-black/60">$</sup>16</p>
                <div :class="[selectedPlan == 3 ? 'bg-white': 'bg-late-50']" class="mt-4 flex flex-col space-y-3">
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        All the features of pro plan
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Account success Manager
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Single Sign-On (SSO)
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Co-conception program
                    </div>
                    <div class="flex items-center">
                        <svg class="mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"/></svg>
                        Collaboration-Soon
                    </div>
                </div>                
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data () {
        return {
            billPlan: 0,
            selectedPlan: 0
        }
    }
}
</script>
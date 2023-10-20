<template>
    <div class="h-screen w-full flex flex-col justify-center items-center bg-white">
        <div class="w-1/3 p-5 flex flex-col bg-slate-100 rounded-lg shadow-lg">
            <h2 class="font-semibold text-2xl">Log In</h2>
            <h6 class="font-light text-black/70">Get started</h6>
            <div class="mt-10">
                <input class="py-2 pl-2 rounded border" placeholder="Phone number" type="text"/>
                <input class="mt-3 py-2 pl-2 rounded border" placeholder="Password" type="password"/>
            </div>
            <div class="px-2 mt-6 flex items-center">
                <input class="bg-transparent border rounded" type="checkbox" />
                <label class="ml-2">Remember me</label>
            </div>
            <button class="mt-7 py-2 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-xl active:scale-95">LOGIN</button>
            <div class="mt-5 flex justify-between">
                <p class="text-xs text-blue-400 hover:underline cursor-pointer ">Create account</p>
                <p class="text-xs text-blue-400 hover:underline cursor-pointer ">Forgot password?</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
           credentials: {
                phonenumber: '',
                password: ''
            } 
        }
    },
    methods: {
        login () {
            // validate entry
            // send entry
            // navigate away or show error message
        }
    }
}
</script>
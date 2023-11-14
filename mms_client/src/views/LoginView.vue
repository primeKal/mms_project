<template>
    <div class="h-screen w-full flex flex-col justify-center items-center bg-white">
        <div class="w-1/3 p-5 flex flex-col bg-slate-100 rounded-lg shadow-lg">
            <h2 class="font-semibold text-2xl bg-skin-primary">Log In</h2>
            <h6 class="font-light text-black/70">Get started</h6>
            <div class="mt-10 flex flex-col">
                <input class="py-2 pl-2 rounded border" placeholder="Email" type="Email" v-model.trim="credentials.email"/>
                <input class="mt-3 py-2 pl-2 rounded border" placeholder="Password" type="password" v-model.trim="credentials.password"/>
            </div>
            <div class="px-2 mt-6 flex items-center">
                <input class="bg-transparent border rounded" type="checkbox" />
                <label class="ml-2">Remember me</label>
            </div>
            <button @click="login" class="mt-7 py-2 flex justify-center bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-xl active:scale-95">
                <svg v-if="loading" class="self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                <p v-else class="self-center">LOGIN</p>
            </button>
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
                email: '',
                password: ''
            },
            loading: false,
        }
    },
    methods: {
        async login () {
            this.loading = true
            // validate entry
            if(this.credentials.email.length && this.credentials.password.length) {
                // send entry
                const status = await this.$store.dispatch('Company/login', this.credentials)
                if(status) {
                    this.$router.replace({name: 'dashboard'})
                }else {
                    this.$toast.error('Invalid email or password')
                }
            }else {
                // navigate away or show error message
                this.$toast.warning('Fill in the information')
            }
            this.loading = false            
        }
    }
}
</script>
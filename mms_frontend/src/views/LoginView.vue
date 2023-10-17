<template>
    <div class="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-emerald-100 to-emerald-200">
        <div class="xl:w-2/3 lg:w-3/5 md:w-3/4 w-11/12 py-5 px-7 flex md:flex-row flex-col bg-white rounded-2xl shadow-xl">
            <div class="md:block hidden basis-1/2">
                <img src="@/assets/images/login_vector.jpg" class="w-full h-full object-contatin" />
            </div>
            <div class="md:basis-1/2 basis-auto px-2 flex flex-col items-center justify-center">
                <div class="w-full flex flex-col">
                    <p class="text-4xl font-bold">Login</p>
                    <div class="my-5">
                        <div class="w-full flex flex-col">
                            <label 
                                for="username"
                                class="font-light"
                            >
                                Username
                            </label>
                            <input 
                                name="username"
                                class="mt-1 primary-input-field"
                                type="text"
                                v-model="username"
                            />
                        </div>
                        <div class="mt-2 w-full flex flex-col">
                            <label 
                                for="password"
                                class="font-light"
                            >
                                Password
                            </label>
                            <input 
                                name="password"
                                class="mt-1 primary-input-field"
                                type="password"
                                v-model="password"
                            />
                        </div>
                        <div class="mt-2 flex justify-between">
                            <div class="flex items-center">
                                <input type="checkbox" />
                                <p class="ml-2">Remember me</p>
                            </div>
                            <button class="text-emerald-400 hover:underline">Forgot Password?</button>
                        </div>
                    </div>
                    <button
                        @click="login"
                        class="self-end px-5 py-2 bg-emerald-400 text-white font-semibold text-xl rounded hover:bg-emerald-500 active:scale-95 transition-all duration-200 ease-in"
                    >
                        Login
                    </button>
                    
                    <p class="mt-10 text-center">Dont have an account?  <span @click="$router.push({name: 'signup'})" class="text-emerald-400 hover:underline cursor-pointer">Sign up</span></p>
                    <div class="my-3 w-full flex justify-center items-center">
                        <hr class="w-10 border"/>
                        <p class="mx-4">OR</p>
                        <hr class="w-10 border"/>
                    </div>
                    <div class="flex justify-center space-x-3">
                        <div class="rounded-md p-2 bg-blue-200 hover:bg-blue-300 text-blue-700 cursor-pointer shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9h4.5l-.5 2h-4v9h-2v-9H7V9h4V7.128c0-1.783.186-2.43.534-3.082a3.635 3.635 0 0 1 1.512-1.512C13.698 2.186 14.345 2 16.128 2c.522 0 .98.05 1.372.15V4h-1.372c-1.324 0-1.727.078-2.139.298a1.63 1.63 0 0 0-.691.692c-.22.411-.298.814-.298 2.138V9Z"/></svg>
                        </div>
                        <div class="rounded-md p-2 bg-red-200 hover:bg-red-300 text-red-700 cursor-pointer shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11h8.533c.044.385.067.78.067 1.184c0 2.734-.98 5.036-2.678 6.6c-1.485 1.371-3.518 2.175-5.942 2.175A8.976 8.976 0 0 1 3 11.98A8.976 8.976 0 0 1 11.98 3c2.42 0 4.453.89 6.008 2.339L16.526 6.8C15.368 5.681 13.803 5 12 5a7 7 0 0 0 0 14c3.527 0 6.144-2.608 6.577-6H12v-2Z"/></svg>
                        </div>
                        <div class="rounded-md p-2 bg-gray-200 hover:bg-gray-300 text-black cursor-pointer shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z"/></svg>
                        </div>
                    </div>
                    <!-- <p class="mt-7 text-center text-black/70 text-xs font-light">Lika-et</p> -->
                </div>
            </div>
                
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {

        }
    }
}
</script>
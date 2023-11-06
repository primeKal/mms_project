<template>
    <div class="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-emerald-100 to-emerald-200">
        <form @submit.prevent="registerRestaurant" class="w-3/5 p-16 flex flex-col bg-white rounded-lg">
            <p class="text-2xl font-bold">Logo</p>
            <p class="mt-7 text-black/70 text-center">
                Welcome to our menu management system. Please fill the folowing information to register your restaurant 
                <br/>
                <span class="font-semibold">Simple menus. Easy Access</span>
            </p>
            <div class="w-full mt-10 flex items-center">
                <label class="basis-1/4">Restaurant Name:</label>
                <input class="w-full py-2 px-3 rounded-lg border" type="text" v-model="restaurantInfo.name"/>
            </div>
            <div class="w-full mt-4 flex items-center">
                <label class="basis-1/4">User Name:</label>
                <input class="w-full py-2 px-3 rounded-lg border" type="text" v-model="restaurantInfo.username"/>
            </div>
            <div class="w-full mt-4 flex items-center">
                <label class="basis-1/4">Email:</label>
                <input class="w-full py-2 px-3 rounded-lg border" type="text" v-model="restaurantInfo.email"/>
            </div>
            <div class="w-full mt-4 flex items-center">
                <label class="basis-1/4">Password:</label>
                <input class="w-full py-2 px-3 rounded-lg border" type="password" v-model="restaurantInfo.password"/>
            </div>
            <div class="w-full mt-4 flex items-center">
                <label class="basis-1/4">Confirm Password:</label>
                <input class="w-full py-2 px-3 rounded-lg border" type="password" v-model="restaurantInfo.confirm_password"/>
            </div>
            <div class="mt-10 flex justify-end">
                <button type="submit" class="text-xl py-2 px-8 primary-button">Register</button>
            </div>
        </form>
    </div>
</template>
<script>
import UserAPI from '@/services/auth/User'
export default {
    data () {
        return {
            restaurantInfo: {
                name: '',
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            }
        }
    },
    methods: {
        async registerRestaurant() {
            // request
            await UserAPI.signUp(this.restaurantInfo)
                .then((result)=>{
                    console.log(result)
                })
        }
    }
}
</script>
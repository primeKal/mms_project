<template>
    <div class="relative h-full pt-5 flex flex-col justify-between bg-white ">
        <span>logo</span>
        <div class="px-3 w-full">
            <button @click="$router.push({name: 'menu'})" :class="{'text-emerald-400 font-semibold': navKey == 1}" class="w-full px-2 py-4 flex items-center hover:text-white hover:bg-emerald-400 transition ease-in duration-150 cursor-pointer">
                <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 19V8.35c0-.82-.5-1.55-1.26-1.86l-8-3.2c-.48-.19-1.01-.19-1.49 0l-8 3.2C2.5 6.8 2 7.54 2 8.35V19c0 1.1.9 2 2 2h3v-9h10v9h3c1.1 0 2-.9 2-2zm-11 0H9v2h2v-2zm2-3h-2v2h2v-2zm2 3h-2v2h2v-2z"/></svg>
                Menu
            </button>
            <hr class="-px-3"/>
            <button  @click="$router.push({name: 'wedding-list'})" :class="{'text-emerald-400 font-semibold': navKey == 2}" class="w-full px-2 py-4 flex items-center hover:text-white hover:bg-emerald-400 transition ease-in duration-150 cursor-pointer">
                <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 10H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1zm3-7h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1zm-5-5H8c-.55 0-1 .45-1 1s.45 1 1 1h5c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
                Table Menu
            </button>
            <hr class="-px-3"/>
            <button  @click="$router.push({name: 'validator-list'})" :class="{'text-emerald-400 font-semibold': navKey == 3}" class="w-full px-2 py-4 flex items-center hover:text-white hover:bg-emerald-400 transition ease-in duration-150 cursor-pointer">
                <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 16v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2zm13 2H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zM12 2C9.54 2 7.48 3.79 7.07 6.13c-.08.52.06 1.05.36 1.47l3.76 5.26a1 1 0 0 0 1.63 0l3.76-5.26c.3-.42.44-.95.35-1.47A5.016 5.016 0 0 0 12 2z"/></svg>
                Orders
            </button>
        </div>
        <span>Logout</span>  
        <button @click="showFull = !showFull"  class="absolute  top-1/2 -right-3 p-2 pl-3 flex justify-center items-center cursor-pointer rounded-full bg-emerald-400 text-white active:scale-95">
            <svg :class="[showFull? 'rotate-0': 'rotate-180']" class="transition ease-in-out duration-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.125 21.1L.7 12.7q-.15-.15-.213-.325T.425 12q0-.2.063-.375T.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L3.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"/></svg>
        </button>             
    </div>
</template>
<script>
export default {
    props: ['navKey'],
    data(){
        return {
            showFull: true
        }
    }
}
</script>
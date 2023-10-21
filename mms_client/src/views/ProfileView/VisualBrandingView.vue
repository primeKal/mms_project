<template>
    <div class="p-6 pr-12 w-full">
        <h3 class="text-primary font-medium text-xl">Visual Branding</h3>
        <div class="w-full mt-5 flex">
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Primary Color</label>
                <div class="mt-2 flex items-center">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><rect width="192" height="192" x="32" y="32" :fill="primaryColor" rx="16"/></svg> -->
                    <color-picker 
                        v-model:pureColor="primaryColor"  
                        format="hex" 
                        shape="circle" 
                        pickerType="chrome" 
                        useType="pure" 
                        lang="En" 
                    />
                    <label class="ml-2 font-medium">{{ primaryColor }}</label>
                </div>
            </div>
            <div class="w-1/3 flex flex-col">
                <label class="text-sm text-gray-700">Secondary Color</label>
                <div class="mt-2 flex items-center">
                    <color-picker 
                        v-model:pureColor="secondaryColor"  
                        format="hex" 
                        shape="circle" 
                        pickerType="chrome" 
                        useType="pure" 
                        lang="En" 
                    />
                    <label class="ml-2 font-medium">{{ secondaryColor }}</label>
                </div>
            </div>
            <div class="w-1/3 flex flex-col">
               
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
export default {
    components: {
        ColorPicker,
    },
    setup (){
        const primaryColor = ref("#28ff00");
        const secondaryColor = ref("#ff6600");
        return {
            primaryColor,
            secondaryColor
        }
    },
    data () {
        return {
            openColorSelector: 0,
        }
    }
}
</script>
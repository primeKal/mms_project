<template>
   <ModalLayoutVue>
        <div class="lg:w-1/2 w-5/6 bg-white rounded-xl p-12">
            <div class="w-full flex justify-end">
                <svg @click="$emit('closeModal')" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 7l10 10M7 17L17 7"/></svg>
            </div>
            <p class="text-lg text-black/70">{{ companyInfo.name }} qr code</p>
            <div class="mt-8 flex space-x-6">
                <QRCodeVue3 
                    :key="qrKey"
                    :width="300"
                    :height="300"
                    :value="qrValue"
                    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                    :image="'/images/restaurant_logo.png'"
                    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
                    :dotsOptions="{
                        type: qrData.dotType,
                        color: companyProfile.primaryColor,
                        gradient: {
                        type: 'linear',
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: qrData.primaryColor },
                            { offset: 1, color: qrData.secondaryColor },
                        ],
                        },
                    }"
                    :backgroundOptions="{ color: '#ffffff' }"
                    :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
                    :cornersDotOptions="{ type: undefined, color: '#000000' }"
                    fileExt="png"
                    :download="true"
                    myclass="my-qur"
                    imgclass="img-qr"
                    downloadButton=" mt-4 py-2 px-5 border rounded font-semibold"
                    :downloadOptions="{ name: companyInfo.name, extension: 'png' }"
                />
                <div class="w-full flex flex-col space-y-3">
                    <p class="font-semibold">QR Code options</p>
                    <div class="flex w-full">
                        <label class="w-1/3">Dot Style:</label>
                        <select v-model="qrData.dotType" class="rounded border py-1 px-2 h-min">
                            <option value="rounded">Rounded</option>
                            <option value="dots">Dots</option>
                            <option value="classy">Classy</option>
                            <option value="classy-rounded">Classy Rounded</option>
                            <option value="square">Square</option>
                            <option value="extra-rounded">Rounded</option>
                        </select>
                    </div>
                    <!-- <div class="flex w-full items-center">
                        <label class="w-1/3">Gradient Type:</label>
                        <input type="radio"  v-model="qrData.gradientType" value="false"/>
                        <label class="ml-2">Single Color</label>
                        <input class="ml-3" type="radio" v-model="qrData.gradientType" value="true" />
                        <label class="ml-2">Gradient Color</label>
                    </div> -->
                    <div :key="qrKey" class="flex w-full items-center">
                        <!-- <label v-if="!qrData.gradientType" class="w-1/4">Dot color</label> -->
                        <label class="w-1/4">Gradient colors</label>
                        <color-picker 
                            v-model:pureColor="qrData.primaryColor"  
                            format="hex" 
                            shape="square" 
                            pickerType="chrome" 
                            useType="pure" 
                            lang="En" 
                        />
                        <color-picker
                            
                            v-model:pureColor="qrData.secondaryColor"  
                            format="hex" 
                            shape="square" 
                            pickerType="chrome" 
                            useType="pure" 
                            lang="En" 
                        />                        
                    </div>
                    <div class="flex w-full">

                    </div>
                </div>
            </div>
            
        </div>
   </ModalLayoutVue>
</template>
<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import QRCodeVue3 from 'qrcode-vue3'
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import ModalLayoutVue from '@/layout/ModalLayout.vue'
export default {
    props: {
        qrValue: String,
        companyInfo: Object,
    },
    components: {
        ModalLayoutVue,
        ColorPicker,
        QRCodeVue3,
    },
    setup (){
        const qrData = ref({
            primaryColor: null,
            secondaryColor: null,
            dotType: 'dots',
        })
        const primaryColor = ref("#28ff00");
        const secondaryColor = ref("#ff6600");
        return {
            qrData,
            primaryColor,
            secondaryColor
        }
    },
    data () {
        return {
            qrKey: 1,
        }
    },
    computed: {
        ...mapGetters({
            companyProfile: 'Company/getCompanyInfo',
        })
    },
    watch: {
        qrData: {
            handler () {
                // if(!this.qrData.gradientType && this.qrData.primaryColor !== this.qrData.secondaryColor) {
                //     this.qrData.secondaryColor = newValue.primaryColor
                // }
                this.qrKey += 1
            },
            deep: true,
        },
    },
    beforeMount() {
        this.qrData.primaryColor = this.companyProfile.primaryColor ? this.companyProfile.primaryColor : '#28ff00'
        this.qrData.secondaryColor = this.qrData.primaryColor
        console.log(this.companyProfile)
    }
}
</script>
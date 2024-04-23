<template>
    <ModalLayoutVue>
        <div class="w-3/4 p-10 bg-white rounded-xl">
            <div class="w-full flex justify-between">
                <h2 class="font-medium text-2xl">Add QR Code Design</h2>
                <svg @click="$emit('closeModal')" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94z" clip-rule="evenodd"/></svg>
            </div>  
            <div class="mt-9 flex border">
                <div class="basis-1/3 border">
                    <div class="w-full p-4 border">
                        <div class="flex justify-between">
                            <p>QR Code</p>
                            <svg @click="openQR = !openQR" :class="[openQR ? 'rotate-180' : 'rotate-0']" class="cursor-pointer transition-transform" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"/></svg>
                        </div>
                        <SubMenuTransitonVue>
                            <div v-if="openQR" class="p-3 flex flex-col space-y-3">
                                <fieldset class="w-full border rounded">
                                    <legend class="ml-3 text-xs px-1">Size</legend>
                                    <input type="text" class="w-full pt-1 pb-1 px-2 outline-none" v-model="qrData.size" />
                                </fieldset>
                                <fieldset class="w-full border rounded">
                                    <legend class="ml-3 text-xs px-1">Image space</legend>
                                    <input type="text" class="w-full pt-1 pb-1 px-2 outline-none" v-model="qrData.margin" />
                                </fieldset>
                            </div>
                        </SubMenuTransitonVue>
                    </div>
                    <div class="w-full p-4 border">
                        <div class="flex justify-between">
                            <p>Image</p>
                            <svg @click="openImage = !openImage" :class="[openImage ? 'rotate-180' : 'rotate-0']" class="cursor-pointer transition-transform" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"/></svg>
                        </div>
                        <SubMenuTransitonVue>
                            <div v-if="openImage" class="p-3 flex flex-col space-y-3">
                                <button class="p-2 bg-white text-primary font-semibold rounded border border-primary hover:bg-primary hover:text-white flex items-center">
                                    <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
                                    CHOOSE IMAGE
                                </button>
                                <fieldset class="w-full border rounded">
                                    <legend class="ml-3 text-xs px-1">Size</legend>
                                    <input type="text" class="w-full pt-1 pb-1 px-2 outline-none" v-model="qrData.imageSize" />
                                </fieldset>
                            </div>
                        </SubMenuTransitonVue>
                    </div>
                    <div class="w-full p-4 border">
                        <div class="flex justify-between">
                            <p>Dots</p>
                            <svg @click="openDots = !openDots" :class="[openDots ? 'rotate-180' : 'rotate-0']" class="cursor-pointer transition-transform" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"/></svg>
                        </div>
                        <SubMenuTransitonVue>
                            <div v-if="openDots" class="p-3 flex flex-col space-y-3">
                                <fieldset class="w-1/4 border rounded">
                                    <legend class="ml-3 text-xs px-1">Dot Style</legend>
                                    <select v-model="qrData.dotType" class="rounded border py-1 px-2 h-min">
                                        <option value="rounded">Rounded</option>
                                        <option value="dots">Dots</option>
                                        <option value="classy">Classy</option>
                                        <option value="classy-rounded">Classy Rounded</option>
                                        <option value="square">Square</option>
                                        <option value="extra-rounded">Rounded</option>
                                    </select>
                                </fieldset>
                                <div class="flex w-full items-center">
                                    <label class="w-1/3">Gradient Type:</label>
                                    <input type="radio"  v-model="qrData.gradientType" value="false"/>
                                    <label class="ml-2">Single Color</label>
                                    <input class="ml-3" type="radio" v-model="qrData.gradientType" value="true" />
                                    <label class="ml-2">Gradient Color</label>
                                </div>
                                <div>
                                    <label v-if="!qrData.gradientType">Dot color</label>
                                    <label v-else>Gradient colors</label>
                                    <div class="flex">
                                        <color-picker 
                                            class="mr-5"
                                            v-model:pureColor="qrData.primaryColor"  
                                            format="hex" 
                                            shape="square" 
                                            pickerType="chrome" 
                                            useType="pure" 
                                            lang="En" 
                                        />
                                        <color-picker
                                            v-if="qrData.gradientType"
                                            v-model:pureColor="qrData.secondaryColor"  
                                            format="hex" 
                                            shape="square" 
                                            pickerType="chrome" 
                                            useType="pure" 
                                            lang="En" 
                                        />    
                                    </div>                                     
                                </div>
                            </div>
                        </SubMenuTransitonVue>
                    </div>
                    <div class="w-full p-4 border">
                        <div class="flex justify-between">
                            <p>Corner Square</p>
                            <svg @click="openCorner = !openCorner" :class="[openCorner ? 'rotate-180' : 'rotate-0']" class="cursor-pointer transition-transform" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"/></svg>
                        </div>
                        <SubMenuTransitonVue>
                            <div v-if="openCorner" class="p-3 flex flex-col space-y-3">
                                <fieldset class="w-full border rounded">
                                    <legend class="ml-3 text-xs px-1">Corner Style</legend>
                                    <select v-model="qrData.cornersStyle" class="rounded border py-1 px-2 h-min">
                                        <option value="none">Rounded</option>
                                        <option value="dots">Dot</option>
                                        <option value="square">Square</option>
                                        <option value="extra-rounded">Extra Rounded</option>
                                    </select>
                                </fieldset>
                                <div>
                                    <label>Corners Color</label>
                                    <color-picker 
                                        class="mt-2"
                                        v-model:pureColor="qrData.cornerColor"  
                                        format="hex" 
                                        shape="square" 
                                        pickerType="chrome" 
                                        useType="pure" 
                                        lang="En" 
                                    />
                                </div>
                            </div>
                        </SubMenuTransitonVue>
                    </div>
                    <div class="w-full p-4 border">
                        <div class="flex justify-between">
                            <p>Corner Dots</p>
                            <svg @click="openCornerDot = !openCornerDot" :class="[openCornerDot ? 'rotate-180' : 'rotate-0']" class="cursor-pointer transition-transform" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"/></svg>
                        </div>
                        <SubMenuTransitonVue>
                            <div v-if="openCornerDot" class="p-3 flex flex-col space-y-3">
                                <fieldset class="w-full border rounded">
                                    <legend class="ml-3 text-xs px-1">Corner Dot Style</legend>
                                    <select v-model="qrData.cornerDot" class="rounded border py-1 px-2 h-min">
                                        <option value="none">Rounded</option>
                                        <option value="dots">Dot</option>
                                        <option value="square">Square</option>
                                    </select>
                                </fieldset>
                                <div>
                                    <label>Corners Dot Color</label>
                                    <color-picker 
                                        class="mt-2"
                                        v-model:pureColor="qrData.cornorDotColor"  
                                        format="hex" 
                                        shape="square" 
                                        pickerType="chrome" 
                                        useType="pure" 
                                        lang="En" 
                                    />
                                </div>
                            </div>
                        </SubMenuTransitonVue>
                    </div>
                </div>
                <div class="basis-2/3 flex flex-col justify-center items-center">
                    <QRCodeVue3 
                        :key="qrKey"
                        :width="300"
                        :height="300"
                        :value="dataUrl"
                        :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                        :image="'/images/restaurant_logo.png'"
                        :imageOptions="{ hideBackgroundDots: true, imageSize: qrData.imageSize, margin: 0 }"
                        :dotsOptions="{
                            type: qrData.dotType,
                            color: qrData.primaryColor,
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
                        :cornersSquareOptions="{ type: qrData.cornersStyle, color: qrData.cornerColor }"
                        :cornersDotOptions="{ type: qrData.cornerDot, color: qrData.cornorDotColor }"
                        fileExt="png"
                        :download="false"
                        myclass="my-qur"
                        imgclass="img-qr"
                        downloadButton=" mt-4 py-2 px-5 border rounded font-semibold"
                        :downloadOptions="{ name: name, extension: 'png' }"
                    />
                    <button class="mt-10 bg-priamry text-white py-2 px-7 rounded">SAVE QR CODE DESIGN</button>
                </div>
            </div>
        </div>
    </ModalLayoutVue>
</template>
<script>
import { ref } from 'vue'

import QRCodeVue3 from 'qrcode-vue3'
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import ModalLayoutVue from '@/layout/ModalLayout.vue'
import SubMenuTransitonVue from '@/components/transitions/SubMenuTransiton.vue'
export default {
    setup () {
        const qrData = ref({
            primaryColor: '#28ff00',
            secondaryColor: '28ff00',
            image: '/images/insert_image.png',
            size: 300,
            imageSize: 0.4,
            gradientType: false,
            margin: 0,
            dotType: 'square',
            cornersStyle: 'rounded',
            cornerColor: '#000000',
            cornerDot: 'dot',
            cornorDotColor: '#000000'
        })
        return {
            qrData,
        }
    },
    data () {
        return {
            name: 'table1QR',
            dataUrl: 'www.google.com',
            qrKey: 1,
            openQR: false,
            openImage: false,
            openDots: false,
            openCorner: false,
            openCornerDot: false,
        }
    },
    watch: {
        qrData: {
            handler () {
                this.qrKey += 1
            },
            deep: true,
        },
    },
    components: {
        ModalLayoutVue,
        SubMenuTransitonVue,
        ColorPicker,
        QRCodeVue3,
    }    
}
</script>
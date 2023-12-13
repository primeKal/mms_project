<template>
   <ModalLayoutVue>
        <div class="lg:w-1/2 w-5/6 bg-white rounded-xl p-12">
            <div class="w-full flex justify-end">
                <svg @click="$emit('closeModal')" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 7l10 10M7 17L17 7"/></svg>
            </div>
            <div class="flex justify-center items-center">
                <QRCodeVue3 
                    :width="400"
                    :height="400"
                    :value="qrValue"
                    :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                    :image="companyInfo.logo"
                    :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
                    :dotsOptions="{
                        type: 'dots',
                        color: companyInfo.primaryColor,
                        gradient: {
                        type: 'linear',
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: companyInfo.primaryColor },
                            { offset: 1, color: companyInfo.primaryColor },
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
                    :downloadOptions="{ name: companyInfo.menu.name, extension: 'png' }"
                />
            </div>
            
        </div>
   </ModalLayoutVue>
</template>
<script>
import ModalLayoutVue from '@/layout/ModalLayout.vue'
import QRCodeVue3 from 'qrcode-vue3'
export default {
    props: {
        qrValue: String,
        companyInfo: Object,
    },
    components: {
        ModalLayoutVue,
        QRCodeVue3,
    }
}
</script>
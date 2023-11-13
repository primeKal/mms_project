<template>
    <div>
       <NavBarVue :selectedSection="selectedSection" />
       <LandingSectionVue />
       <AboutUsSectionVue />
        <PricingSectionVue />
        <FooterLayoutVue />
    </div>
</template>
<script>
import NavBarVue from '@/layout/NavBar.vue'
import LandingSectionVue from './LandingSection.vue'
import AboutUsSectionVue from './AboutUsSection.vue'
import PricingSectionVue from './PricingSection.vue'
import FooterLayoutVue from '@/layout/FooterLayout.vue'
export default {
    components:{
        NavBarVue,
        LandingSectionVue,
        AboutUsSectionVue,
        PricingSectionVue,
        FooterLayoutVue,
    },
    data() {
        return {
            selectedSection: 0
        }
    }
}
</script>
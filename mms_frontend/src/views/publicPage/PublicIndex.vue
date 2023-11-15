<template>
    <div>
       <NavBarVue :selectedSection="selectedSection" />
       <LandingSectionVue />
       <AboutUsSectionVue />
        <OurPratnersVue />
        <PricingSectionVue />
        <TestimonialsSectionVue />
        <ContactUsSectionVue />
        <FooterLayoutVue />
    </div>
</template>
<script>
import NavBarVue from '@/layout/NavBar.vue'
import LandingSectionVue from './LandingSection.vue'
import AboutUsSectionVue from './AboutUsSection.vue'
import OurPratnersVue from './OurPratners.vue'
import PricingSectionVue from './PricingSection.vue'
import TestimonialsSectionVue from './TestimonialsSection.vue'
import ContactUsSectionVue from './ContactUsSection.vue'
import FooterLayoutVue from '@/layout/FooterLayout.vue'
export default {
    components:{
        NavBarVue,
        LandingSectionVue,
        AboutUsSectionVue,
        OurPratnersVue,
        PricingSectionVue,
        TestimonialsSectionVue,
        ContactUsSectionVue,
        FooterLayoutVue,
    },
    data() {
        return {
            selectedSection: 0
        }
    }
}
</script>
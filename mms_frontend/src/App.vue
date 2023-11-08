<template>
  <router-view/>
</template>
<script>
// import {ref} from 'vue'
export default {
  beforeCreate() {
    document.documentElement.style.setProperty('--color-primary', '67 170 132')
  }
}
</script>
<style>
:root{
  /* --color-primary: v-bind(primary); */
  --color-secondary: v-bind(secondary);
}
</style>


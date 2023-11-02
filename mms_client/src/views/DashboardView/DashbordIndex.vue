<template>
    <div>
        Dashboard view
    </div>
</template>
<script>
export default {
    mounted () {
        this.$emit('selectedNav', 1)
    }
}
</script>
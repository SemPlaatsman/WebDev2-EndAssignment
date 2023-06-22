<template>
    <section class="container d-flex justify-content-center align-items-center h-50">
        <section class="d-flex">
            <span class="fs-3 text-black">Loading</span>
            <pulse-loader class="mt-3" :loading="true" :color="green" size="12px" margin="4px" />
        </section>
    </section>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
    name: "Loading",
    components: {
        PulseLoader
    }
}
</script>

<style scoped>

</style>
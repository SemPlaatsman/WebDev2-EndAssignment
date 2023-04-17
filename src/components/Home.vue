<template>
    <section class="container d-flex justify-content-center align-items-center">
        <section class="d-flex">
            <span class="fs-3">Loading</span>
            <pulse-loader class="mt-3" :loading="true" :color="green" size="12px" margin="4px" />
        </section>
    </section>
</template>

<script>
console.log();
import { axiosMySQL } from '../axios-auth';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "Home",
    components: {
        PulseLoader
    },
    mounted() {
        axiosMySQL.get('products')
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }
}
</script>

<style scoped>

</style>
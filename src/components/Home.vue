<template>
    <section class="container d-flex justify-content-center align-items-center">
        Welcome to the homepage {{ test }}
    </section>
</template>

<script>
import { axiosTFFDB } from '../axios-auth';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { userAuthStore } from '../stores/auth-store';

export default {
    name: "Home",
    setup() {
        return { store: userAuthStore() }
    },
    components: {
        PulseLoader
    },
    data() {
        return {
            test: this.store.isAuthenticated
        }
    },
    mounted() {
        axiosTFFDB.get('appointments')
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }
}
</script>

<style scoped>

</style>
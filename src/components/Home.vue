<template>
    <section class="container d-flex justify-content-center align-items-center">
        Welcome to the homepage {{ test }}
    </section>
</template>

<script>
import { axiosCatAPI } from '../axios-auth';
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
        axiosTFFDB.get('cats/1000')
        .then(result => console.log(result))
        .catch(error => console.log(error.response.data.errorMessage ?? "Something went wrong while trying to load a cat!"));
    }
}
</script>

<style scoped>

</style>
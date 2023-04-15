<template>
    <section class="container">
        Welcome to the homepage
    </section>
</template>

<script>
import axios from '../axios-auth';

export default {
    name: "Home",
    mounted() {
        axios.get('products')
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }
}
</script>

<style scoped>

</style>
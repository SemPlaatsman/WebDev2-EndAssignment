<template>
    <section class="container">
        Welcome to the homepage
    </section>
</template>

<script>
console.log();
import { axiosMySQL } from '../axios-auth';

export default {
    name: "Home",
    mounted() {
        axiosMySQL.get('products')
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }
}
</script>

<style scoped>

</style>
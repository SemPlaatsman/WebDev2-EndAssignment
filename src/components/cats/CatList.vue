<template>
    <section class="container">
        Welcome to the cat homepage
    </section>
</template>

<script>
import { axiosCatAPI } from '../../axios-auth';

export default {
    name: "CatList",
    async setup() {
        const result = await axiosCatAPI.get('images/search?has_breeds=1&limit=16');
        console.log(result);
    }
}
</script>

<style scoped>

</style>
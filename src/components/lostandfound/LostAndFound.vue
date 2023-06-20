<template>
    <section class="container p-5 pt-2">
        <h2>Lost or found a cat?</h2>
        <p class="w-75 mx-auto">
            Welcome to the Lost and Found page of our cat shelter! 
            We understand how distressing it can be when a beloved feline companion goes missing or when you come across a stray cat in need of help. 
            So together, let's ensure that every furry friend finds their way back or discovers a new loving family!
        </p>
        <div>
            <label for="page">Page: </label>
            <input v-model="page" class="col-1 ms-3" min="1" type="number" id="page">
        </div>
        <LostAndFoundList />
    </section>
</template>

<script>
import LostAndFoundList from './LostAndFoundList.vue';

export default {
    name: "LostAndFound",
    components: {
        LostAndFoundList
    }
}
</script>

<style scoped>
#app > .container > *:not(.container) {
    text-align: center;
}
</style>
<template>
    <section class="container p-5 pt-2">
        <h2>Looking for a new roommate?</h2>
        <p class="w-75 mx-auto">
            Looking for a new four-legged roommate? The Felis Foundation can help you find the perfect match with everything we know about our little friends. 
            Don't wait; our cats are looking forward to meet you.
        </p>
        <div>
            <label for="page">Page: </label>
            <input v-model="page" class="col-1 ms-3" min="1" type="number" id="page">
        </div>
        <Suspense>
            <template #default>
                <CatList :page="this.page" />
            </template>
            <template #fallback>
                <!-- Fallback loading indicator -->
                <Loading />
            </template>
        </Suspense>
    </section>
</template>

<script>
import CatList from './CatList.vue';
import Loading from '../Loading.vue';

export default {
    name: "CatHome",
    components: {
        CatList,
        Loading
    },
    data() {
        return {
            page: 1
        }
    }
}
</script>

<style scoped>
#app > .container > *:not(.container) {
    text-align: center;
}

#app > .container > .container {
    border: 3px solid;
    border-color: #6c757d;
    border-radius: 0.25rem;
    background-color: var(--primary-green);
}
</style>
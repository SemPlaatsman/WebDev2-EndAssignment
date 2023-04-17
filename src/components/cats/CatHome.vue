<template>
    <section class="container p-5 pt-2">
        <h2>Looking for a new roommate?</h2>
        <p class="w-75 mx-auto">
            Looking for a new four-legged roommate? The Felis Foundation can help you find the perfect match with everything we know about our little friends. 
            Don't wait; our cats are looking forward to meet you.
        </p>
        <Suspense>
            <template #default>
                <CatList />
            </template>
            <template #fallback>
                <section class="container d-flex justify-content-center align-items-center h-50">
                    <section class="d-flex">
                        <span class="fs-3">Loading</span>
                        <pulse-loader class="mt-3" :loading="true" :color="green" size="12px" margin="4px" />
                    </section>
                </section>
            </template>
        </Suspense>
    </section>
</template>

<script>
import CatList from './CatList.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "CatHome",
    components: {
        CatList,
        PulseLoader
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
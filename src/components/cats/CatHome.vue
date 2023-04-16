<template>
    <Suspense>
        <template #default>
            <CatList />
        </template>
        <template #fallback>
            <section class="container">
                <p>Loading <i class="fa-solid fa-spinner fa-spin-pulse"></i></p>
            </section>
        </template>
    </Suspense>
</template>

<script>
import CatList from './CatList.vue';

export default {
    name: "CatHome",
    components: {
        CatList
    }
}
</script>

<style scoped>

</style>
<template>
    <section class="col-lg-4 col-md-6 col-sm-12 p-2 d-flex align-items-stretch">
        <article class="border-3 border-black card flex-fill">
            <section class="card border-0 h-100 align-items-center">
                <a href="/">
                    <img :src="cat.url" alt="Cat cover">
                </a>
                <section class="card-body w-100">
                    <h5 class="card-title">{{ cat.breeds.map(breed => breed.name).join(', ') }}</h5>
                    <p class="card-text">{{ cat.breeds.map(breed => breed.temperament).join(', ') }}</p>
                </section>
            </section>
            <section class="card-footer d-flex w-100">
                <a :href="`/cats/${cat.id}`" class="btn text-white me-auto">Read more...</a>
            </section>
        </article>
    </section>
</template>

<script>
export default {
    name: "CatListItem",
    props: {
        cat: {
            type: Object,
            default: null
        }
    }
}
</script>

<style scoped>
a > img {
    width: 100%;
    max-height: 200px;
    height: auto;
}

.card-footer > .btn {
    background-color: var(--primary-green);
}
</style>
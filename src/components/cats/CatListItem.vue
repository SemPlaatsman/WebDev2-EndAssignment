<template>
    <section class="col-lg-4 col-md-6 col-sm-12 p-2 d-flex align-items-stretch">
        <article class="card flex-fill">
            <section class="card border-0 h-100 align-items-center">
                <a href="/">
                    <img :src="`https://cdn2.thecatapi.com/images/${cat.id}.jpg`" alt="Cat cover">
                </a>
                <section class="card-body w-100">
                    <h5 class="card-title">{{ cat.breeds[0].name }}</h5>
                    <p class="card-text">{{ cat.breeds[0].temperament }}</p>
                </section>
            </section>
            <section class="card-footer d-flex w-100">
                <a href="/books?id=<?= $book->getId(); ?>" class="btn btn-secondary me-auto">Read further...</a>
            </section>
        </article>
    </section>
</template>

<script>
export default {
    name: "CatListItem",
    props: {
        cat: Object
    }
}
</script>

<style scoped>
a > img {
    width: 100%;
    max-height: 200px;
    height: auto;
}
</style>
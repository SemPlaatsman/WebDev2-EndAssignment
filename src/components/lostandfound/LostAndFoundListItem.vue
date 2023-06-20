<template>
    <section class="col-lg-4 col-md-6 col-sm-12 p-2 d-flex align-items-stretch">
        <article class="card flex-fill">
            <section class="card border-0 h-100 align-items-center">
                <a href="/">
                    <img src="https://forum.chickeninvaders.com/uploads/db1091/original/3X/e/9/e93bc17d06e42dac421fa575fa74125b2b9115da.jpeg" alt="Cat cover">
                </a>
            </section>
            <section class="card-footer d-flex w-100">
                <a :href="`/cats/${cat.id}`" class="btn btn-primary me-auto">Read more...</a>
            </section>
        </article>
    </section>
</template>

<script>
export default {
    name: "LostAndFoundListItem"
}
</script>

<style scoped>

</style>
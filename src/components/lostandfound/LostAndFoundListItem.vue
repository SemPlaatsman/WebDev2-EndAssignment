<template>
    <section class="col-lg-4 col-md-6 col-sm-12 p-2 d-flex align-items-stretch">
        <article :class="`border-3 card flex-fill ${this.statusToName(this.cat.status).toLowerCase()}`">
            <h3 class="text-center">{{ this.statusToName(this.cat.status).replace(/([a-z])([A-Z])/g, '$1 $2') }}</h3>
            <section class="card border-0 h-100 align-items-center">
                <a :href="`/lostandfound/${cat.id}`">
                    <img :src="cat.encodedImage" alt="Cat cover">
                </a>
                <section class="card-body w-100">
                    <h5 class="card-title">{{ cat.breeds.join(", ") }}</h5>
                    <p class="card-text">{{ cat.description }}</p>
                </section>
            </section>
            <section class="card-footer d-flex w-100">
                <a :href="`/lostandfound/${cat.id}`" class="btn text-white me-auto">Read more...</a>
            </section>
        </article>
    </section>
</template>

<script>
import { catStatus, statusToName } from '../../assets/catstatus.js';

export default {
    name: "LostAndFoundListItem",
    setup() {
        return {
            statusToName
        }
    },
    props: {
        cat: {
            type: Object,
            default: null
        }
    },
    created() {
        console.log(this.cat);
    }
}
</script>

<style scoped>
a > img {
    width: 100%;
    max-height: 200px;
    height: auto;
}

.card.flex-fill.lost {
    border-color: var(--error-red);
}
.card.flex-fill.lost > h3 {
    color: var(--error-red) !important;
}
.card.flex-fill.lost > .card-footer > .btn {
    background-color: var(--error-red);
}

.card.flex-fill.found {
    border-color: var(--casual-blue);
}
.card.flex-fill.found > h3 {
    color: var(--casual-blue);
}
.card.flex-fill.found > .card-footer > .btn {
    background-color: var(--casual-blue);
}

.card.flex-fill.inshelter {
    border-color: var(--primary-green);
}
.card.flex-fill.inshelter > h3 {
    color: var(--primary-green);
}
.card.flex-fill.inshelter > .card-footer > .btn {
    background-color: var(--primary-green);
}
</style>
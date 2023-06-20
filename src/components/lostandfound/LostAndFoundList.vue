<template>
    <section class="container row mx-auto py-4">
        <Loading v-if="this.cats.length === 0"/>
        <!-- TODO: if no cats found so cats.length === 0; show a no cats found message -->
        <LostAndFoundListItem v-else="this.cats.length > 0" v-for="cat in cats" :cat="cat" :key="cat.id"/>
    </section>
</template>

<script>
import LostAndFoundListItem from './LostAndFoundListItem.vue';
import Loading from '../Loading.vue';
import { axiosTFFDB } from '../../axios-auth';

export default {
    name: "LostAndFoundList",
    components: {
        Loading,
        LostAndFoundListItem
    },
    props: {
        page: {
            type: Number,
            default: 1,
            required: true
        }
    },
    data() {
        return {
            cats: []
        }
    },
    watch: {
        'page'(newVal) {
            if (!newVal || newVal < 1) {
                this.page = 1;
            }
            this.cats = [];
            this.getLostAndFoundList()
        }
    },
    created() {
        this.getLostAndFoundList();
    },
    methods: {
        getLostAndFoundList() {
            axiosTFFDB.get(('' + (this.page ?? 1)))
            .then(result => {
                this.cats = result;
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>
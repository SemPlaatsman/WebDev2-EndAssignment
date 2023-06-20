<template>
    <section class="container row mx-auto py-4">
        <Loading v-if="this.cats.length === 0"/>
        <CatListItem v-else="this.cats.length > 0" v-for="cat in cats" :cat="cat" :key="cat.id"/>
    </section>
</template>

<script>
import CatListItem from './CatListItem.vue';
import Loading from '../Loading.vue';
import { axiosCatAPI } from '../../axios-auth';

export default {
    name: "CatList",
    components: {
        Loading,
        CatListItem
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
            this.getCatList()
        }
    },
    created() {
        this.getCatList();
    },
    methods: {
        async getCatList() {
            try {
                const result = await axiosCatAPI.get(('images/search?has_breeds=1&limit=9&order=ASC&page=' + (this.page ?? 1)));
                console.log(result)
                const cats = result.data.filter(function(cat) {
                    return (cat.hasOwnProperty('id') && cat.hasOwnProperty('url') && cat.breeds[0].hasOwnProperty('temperament') && cat.breeds[0].hasOwnProperty('name') && cat.breeds[0].hasOwnProperty('description'))
                });
                this.cats = cats;
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>

</style>
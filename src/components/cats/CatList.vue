<template>
    <section class="container row mx-auto py-4 border-black">
        <Loading v-if="this.cats.length === 0"/>
        <CatListItem v-else="this.cats.length > 0" v-for="cat in cats" :cat="cat" :key="cat.id"/>
        <div class="alert alert-danger mt-3" role="alert" v-if="error">
            {{ this.error }}
        </div>
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
        },
        limit: {
            type: Number,
            default: 9,
            required: true
        }
    },
    data() {
        return {
            cats: [],
            error: ''
        }
    },
    watch: {
        'page'(newVal) {
            if (!newVal || newVal < 1) {
                this.page = 1;
            }
            this.cats = [];
            this.getCatList()
        },
        'limit'(newVal) {
            if (!newVal || newVal < 1) {
                this.limit = 9;
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
                const result = await axiosCatAPI.get(('images/search?has_breeds=1&order=ASC&page=' + (this.page ?? 1) + '&limit=' + (this.limit ?? 9)));
                console.log(result)
                const cats = result.data.filter(function(cat) {
                    return (cat.hasOwnProperty('id') && cat.hasOwnProperty('url') && cat.breeds[0].hasOwnProperty('temperament') && cat.breeds[0].hasOwnProperty('name') && cat.breeds[0].hasOwnProperty('description'))
                });
                this.cats = cats;
            } catch (error) {
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data.errorMessage ?? "Something went wrong while trying to load all cats!");
            }
        }
    }
}
</script>

<style scoped>

</style>
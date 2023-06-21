<template>
    <section class="container row mx-auto py-4 border-black">
        <Loading v-if="this.cats.length === 0"/>
        <!-- TODO: if no cats found so cats.length === 0; show a no cats found message -->
        <LostAndFoundListItem v-else="this.cats.length > 0" v-for="cat in cats" :cat="cat" :key="cat.id"/>
    </section>
</template>

<script>
import LostAndFoundListItem from './LostAndFoundListItem.vue';
import Loading from '../Loading.vue';
import { axiosTFFDB } from '../../axios-auth';
import { catStatus } from '../../assets/catstatus.js';

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
        },
        limit: {
            type: Number,
            default: 9,
            required: true
        },
        status: {
            type: Number,
            default: '',
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
            this.getLostAndFoundList();
        },
        'limit'(newVal) {
            if (!newVal || newVal < 1) {
                this.limit = 9;
            }
            this.cats = [];
            this.getLostAndFoundList();
        },
        'status'(newVal) {
            if (newVal < -1 || newVal > catStatus.InShelter) {
                this.status = '';
            }
            console.log(newVal);
            this.cats = [];
            this.getLostAndFoundList();
        }
    },
    created() {
        this.getLostAndFoundList();
    },
    methods: {
        getLostAndFoundList() {
            axiosTFFDB.get(('cats?offset=' + (((this.page ?? 1) - 1) * this.limit) + '&limit=' + (this.limit ?? 9) + '&status=' + (this.status ?? '')))
            .then(result => {
                console.log(result);
                this.cats = result.data;
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
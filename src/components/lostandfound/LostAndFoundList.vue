<template>
    <section class="container row mx-auto py-4 px-0">
        <Loading v-if="this.cats === null"/>
        <!-- TODO: if no cats found so cats.length === 0; show a no cats found message -->
        <div v-else-if="this.cats.length === 0">
            <h1 class="text-center text-primary-green p-5 pb-0">Sorry!</h1>
            <p class="text-center pb-5">
                I'm sorry but there are no cats to be found here...<br>
                Have you looked under the couch?
            </p>
        </div>
        
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
            cats: null
        }
    },
    watch: {
        'page'(newVal) {
            if (!newVal || newVal < 1) {
                this.page = 1;
            }
            this.cats = null;
            this.getLostAndFoundList();
        },
        'limit'(newVal) {
            if (!newVal || newVal < 1) {
                this.limit = 9;
            }
            this.cats = null;
            this.getLostAndFoundList();
        },
        'status'(newVal) {
            if (newVal < -1 || newVal > catStatus.InShelter) {
                this.status = '';
            }
            console.log(newVal);
            this.cats = null;
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
                this.cats = result.data.map(cat => {
                    return { ...cat, encodedImage: `data:image/${cat.imageFormat};base64,${cat.encodedImage}` };
                });
                console.log(this.cats);
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
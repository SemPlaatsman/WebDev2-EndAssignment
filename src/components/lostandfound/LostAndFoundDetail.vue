<template>
    <section v-if="cat" class="container d-flex justify-content-center row mx-auto p-4">
        <h2 class="text-center">{{ this.statusToName(this.cat.status).replace(/([a-z])([A-Z])/g, '$1 $2') }}</h2>
        <img :src="`/jpg/cats/${cat.id}.${cat.imageFormat}`" alt="Cat cover">
        <div>
            <h4>Breeds</h4>
            <div class="col-8">
                {{ this.cat.breeds.join(", ") }}
            </div>
            <div class="col-4">
                
            </div>
        </div>
        <div class="alert alert-danger mt-3 error-message" role="alert" v-if="error">
            {{ this.error }}
        </div>
    </section>
</template>

<script>
import { axiosTFFDB } from '../../axios-auth';
import { catStatus, statusToName } from '../../assets/catstatus.js';

export default {
    name: "LostAndFoundDetail",
    props: {
        passedCat: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            error: null,
            cat: null,
            statusToName
        }
    },
    created() {
        if (this.passedCat === null || !this.passedCat) {
            this.loadCatData();
        } else {
            this.cat = this.passedCat;
        }
    },
    methods: {
        loadCatData() {
            axiosTFFDB.get(("cats/" + this.$route.params.id))
            .then(response => {
                this.cat = response.data
                console.log(this.cat)
            })
            .catch(error => {
                this.error = error.response.data ?? "Something went wrong while trying to load a cat with id " + this.$route.params.id + ". <br>Please try again...";
            })
        }
    }
}
</script>

<style scoped>
.container > img {
  max-width: 50%;
  max-height: 33vh;
  height: auto;
  object-fit: contain;
}
</style>
<template>
    <section v-if="cat" class="container d-flex justify-content-center align-content-start row mx-auto p-4 pt-2">
        <h1 class="text-center"><span v-if="typeof cat.status == 'number'" :class="statusToName(cat.status).toLowerCase()">{{ this.statusToName(this.cat.status).fromCamelToRegularCase() }}</span> cat</h1>
        <img :src="cat.encodedImage" alt="Cat cover">
        <div class="col-md-12 pb-3 pt-5">
            <p class="text-center">Know anything about this feline? Send an email to <a :href="`mailto:${cat.userEmail}`">{{ cat.userEmail }}</a> </p>
        </div>
        <div class="row">
            <div class="col-4">
                <h4>Breeds</h4>
                {{ this.cat.breeds.join(", ") }}
            </div>
            <div class="col-8">
                <h4>Description</h4>
                {{ this.cat.description }}
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
                this.cat = { ...response.data, encodedImage: `data:image/${response.data.imageFormat};base64,${response.data.encodedImage}` }
                console.log(this.cat)
            })
            .catch(error => {
                this.error = error.code === "ERR_NETWORK" ? "Backend failed to initialize!" : (error.response.data ?? "Something went wrong while trying to load a cat with id " + this.$route.params.id + ". <br>Please try again...");
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

h1 > span.lost {
    color: var(--error-red);
}

h1 > span.found {
    color: var(--casual-blue);
}

h1 > span.inshelter {
    color: var(--primary-green);
}
</style>
<template>
  <section v-if="cat" class="container d-flex justify-content-center align-content-start row mx-auto p-4">
    <img :src="cat.url" alt="Cat cover"/>
    <h4></h4>
    <div class="py-3">
      <h4>Breeds</h4>
      <dl class="row col-12" v-for="(breed, index) in cat.breeds">
        <details :open="cat.breeds.length < 3" class="row">
          <summary>{{ breed.name }}</summary>
          <div class="row gy-2 m-0">
            <dt class="col-2">Description:</dt>
            <dd class="col-10">{{ breed.description }}</dd>
            <dt class="col-2">Temperament:</dt>
            <dd class="col-10">{{ breed.temperament }}</dd>
            <dt class="col-2">Origin:</dt>
            <dd class="col-4">{{ breed.origin }}</dd>
            <dt class="col-2">Lifespan:</dt>
            <dd class="col-4">{{ breed.life_span }}</dd>
          </div>
        </details>
      </dl>
    </div>
    <div class="alert alert-danger mt-3 error-message" role="alert" v-if="error">
      {{ this.error }}
    </div>
  </section>
</template>
  
<script>
  import { axiosCatAPI } from '../../axios-auth';
  
  export default {
    name: 'CatDetail',
    props: {
      passedCat: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        error: null,
        cat: null
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
          axiosCatAPI.get(("images/" + this.$route.params.id))
            .then(response => {
              this.cat = response.data
              console.log(this.cat)
            })
            .catch(error => {
              this.error = error.response.data ?? "Something went wrong while trying to load a cat with id " + this.$route.params.id + ". <br>Please try again...";
            })
        }
    }
  };
</script>
  
<style scoped>
.container > img {
  max-width: 50%;
  max-height: 33vh;
  height: auto;
  object-fit: contain;
}

dl dt {
  color: var(--primary-green);
}
</style>
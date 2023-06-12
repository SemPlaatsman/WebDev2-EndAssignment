<template>
  <section v-if="cat" class="container d-flex justify-content-center row mx-auto p-4">
    <img :src="cat.url" alt="Cat cover"/>
    <div>
      <h4>Breeds</h4>
      <dl class="row col-8" v-for="(breed, index) in cat.breeds">
        <dt class="col-3">{{ breed.name }}</dt>
        <dd class="col-9">{{ breed.description }}</dd>
      </dl>
      <div class="col-4">
        
      </div>
    </div>
    <p>{{ cat.breeds }}</p>
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
</style>
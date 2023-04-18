<template>
    <section class="container d-flex justify-content-center">
      <img :src="cat.url" alt="Cat cover" />
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
      },
    },
    data() {
        return {
            cat: null
        };
    },
    mounted() {
        console.log("cat: ", result.data, "route: ", this.$route.params.id);
        if (!this.passedCat) {
            try {
                const result = axiosCatAPI.get('images/' + this.$route.params.id);
                this.cat = result.data;
            } catch (error) {
                console.log('error', error);
            }
        } else {
            this.cat = this.passedCat;
        }
    },
  };
  </script>
  
  <style scoped></style>
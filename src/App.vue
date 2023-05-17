<template>
  <Navigation />
  <router-view />
  <Footer />
</template>

<script>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import { userAuthStore } from './stores/auth-store';

export default {
  name: "App",
  setup() {
    return { store: userAuthStore() }
  },
  components: {
    Navigation,
    Footer
  },
  mounted() {
    this.store.autoLogin();
    console.log(this.store);
  }
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

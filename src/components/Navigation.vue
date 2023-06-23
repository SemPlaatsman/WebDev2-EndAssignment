<template>
  <nav class="d-flex flex-wrap justify-content-center p-3 font-roboto-slab">
    <a href="/" class="fs-3 d-flex align-items-center mb-3 mb-md-0 me-auto text-light text-decoration-none">
      <i class="fa-solid fa-cat"></i><span class="mx-2">The Felis Foundation</span>
    </a>
    <ul class="nav nav-pills">
      <li class="nav-item"><router-link to="/" class="nav-link">HOME</router-link></li>
      <li class="nav-item"><router-link to="/cats" class="nav-link">CATS</router-link></li>
      <li class="nav-item"><router-link to="/lostandfound" class="nav-link">LOST & FOUND</router-link></li>
      <li v-if="store.isAuthenticated && store.role == roles.Employee" class="nav-item"><router-link to="/dashboard" class="nav-link">DASHBOARD</router-link></li>
      <li v-if="store.isAuthenticated" class="nav-item"><router-link to="/profile" class="nav-link">PROFILE</router-link></li>
      <li v-if="store.isAuthenticated" class="nav-item"><a v-on:click="logout" href="#" class="nav-link">LOGOUT</a></li>
      <li v-if="!store.isAuthenticated" class="nav-item"><router-link to="/login" class="nav-link">LOGIN</router-link></li>
      <li v-if="!store.isAuthenticated" class="nav-item"><router-link to="/register" class="nav-link">REGISTER</router-link></li>
    </ul>
  </nav>
</template>

<script>
import { roles } from '../assets/role.js'
import { userAuthStore } from '../stores/auth-store';

export default {
  name: "Navigation",
  data() {
    return {
        store: userAuthStore(),
        roles
    }
  },
  mounted() {
    console.log(this.store.isAuthenticated && this.store.role == roles.Employee)
    console.log(this.store);
    console.log(this.isAuthenticated);
  },
  methods: {
    logout() {
      this.store.logout();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
nav {
  background-color: var(--primary-green);
  height: 75px;
}

.nav-pills > li > a {
  color: white;
}

.nav-pills > li > a:hover {
  color: white;
  font-weight: bold;
}

.nav-pills > li > a.active {
    background-color: #116149;
}
</style>
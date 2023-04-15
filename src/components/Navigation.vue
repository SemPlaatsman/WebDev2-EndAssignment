<template>
  <nav class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom px-3">
    <a href="/" class="fs-3 d-flex align-items-center mb-3 mb-md-0 me-auto text-light text-decoration-none">
      <i class="fa-solid fa-cat"></i><span class="mx-2">The Felis Foundation</span>
    </a>

    <ul class="nav nav-pills">
      <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
      <li class="nav-item"><router-link to="/cats" class="nav-link">Cats</router-link></li>
      <li class="nav-item"><router-link to="/login" class="nav-link">Login</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
    name: "Navigation"
}
</script>

<style scoped>
nav {
  background-color: var(--primary-blue);
}

li > a {
  color: white;
}

li > a:hover {
  color: white;
  font-weight: bold;
}
</style>
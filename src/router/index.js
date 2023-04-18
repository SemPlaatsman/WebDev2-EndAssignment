import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import CatHome from '../components/cats/CatHome.vue';
import CatDetail from '../components/cats/CatDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/cats', component: CatHome },
    { path: '/cats/:id', component: CatDetail }
  ],
  linkActiveClass: "active"
})

export default router
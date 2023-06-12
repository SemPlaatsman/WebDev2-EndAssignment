import { createRouter, createWebHistory } from 'vue-router'
import { userAuthStore } from '../stores/auth-store';

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CatHome from '../components/cats/CatHome.vue';
import CatDetail from '../components/cats/CatDetail.vue';
import LostAndFound from '../components/lostandfound/LostAndFound.vue';
import Profile from '../components/Profile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/cats', component: CatHome },
    { path: '/cats/:id', component: CatDetail },
    { path: '/lostandfound', component: LostAndFound },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } }
  ],
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  const store = userAuthStore();
  store.autoLogin();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !store.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import { userAuthStore } from '../stores/auth-store';
import { axiosCatAPI, axiosTFFDB } from '../axios-auth.js';

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CatHome from '../components/cats/CatHome.vue';
import CatDetail from '../components/cats/CatDetail.vue';
import CatAppointment from '../components/cats/CatAppointment.vue';
import LostAndFound from '../components/lostandfound/LostAndFound.vue';
import LostAndFoundDetail from '../components/lostandfound/LostAndFoundDetail.vue';
import LostAndFoundReport from '../components/lostandfound/LostAndFoundReport.vue'
import Profile from '../components/Profile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/cats', component: CatHome },
    { path: '/cats/:id', component: CatDetail, meta: { apiCatExists: true } },
    { path: '/cats/:id/appointment', component: CatAppointment, meta: { requiresAuth: true, apiCatExists: true } },
    { path: '/lostandfound', component: LostAndFound },
    { path: '/lostandfound/:id(\\d+)', component: LostAndFoundDetail, meta: { tffdbCatExists: true } },
    { path: '/lostandfound/report', component: LostAndFoundReport, meta: { requiresAuth: true } },
    { path: '/lostandfound/report/:status', component: LostAndFoundReport, meta: { requiresAuth: true } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } }
  ],
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  const store = userAuthStore();
  store.autoLogin();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const apiCatExists = to.matched.some(record => record.meta.apiCatExists);
  const tffdbCatExists = to.matched.some(record => record.meta.tffdbCatExists);

  if (requiresAuth && !store.isAuthenticated) {
    next('/login')
    return;
  } else if (apiCatExists) {
    axiosCatAPI.get(('images/' + to.params.id))
      .then(() => {
        next()
      })
      .catch(() => {
        next('/cats');
      });
    return;
  } else if (tffdbCatExists) {
    axiosTFFDB.get(('cats/' + to.params.id))
      .then(response => {
        next()
      })
      .catch(error => {
        next("/lostandfound");
      });
    return;
  } else {
    next()
  }
})

String.prototype.fromCamelToRegularCase = function () {
  console.log(this);
  return this.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export default router
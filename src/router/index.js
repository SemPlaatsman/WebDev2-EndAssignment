import { createRouter, createWebHistory } from 'vue-router'
import { userAuthStore } from '../stores/auth-store';
import { axiosCatAPI, axiosTFFDB } from '../axios-auth.js';
import { roles } from '../assets/role';

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import CatHome from '../components/cats/CatHome.vue';
import CatDetail from '../components/cats/CatDetail.vue';
import CatAppointment from '../components/cats/CatAppointment.vue';
import LostAndFound from '../components/lostandfound/LostAndFound.vue';
import LostAndFoundDetail from '../components/lostandfound/LostAndFoundDetail.vue';
import LostAndFoundReport from '../components/lostandfound/LostAndFoundReport.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile, meta: { requiresAuth: { } } },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: { isEmployee: true } }},
    { path: '/cats', component: CatHome },
    { path: '/cats/:id', component: CatDetail, meta: { apiCatExists: true } },
    { path: '/cats/:id/appointment', component: CatAppointment, meta: { requiresAuth: { }, apiCatExists: true } },
    { path: '/lostandfound', component: LostAndFound },
    { path: '/lostandfound/:id(\\d+)', component: LostAndFoundDetail, meta: { tffdbCatExists: true } },
    { path: '/lostandfound/report', component: LostAndFoundReport, meta: { requiresAuth: { } } },
    { path: '/lostandfound/report/:status', component: LostAndFoundReport, meta: { requiresAuth: { } } }
  ],
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  const store = userAuthStore();
  store.autoLogin();

  if (to.meta.requiresAuth) {
    if (!store.isAuthenticated || (to.meta.requiresAuth.isEmployee && store.role != roles.Employee)) {
      next('/login');
      return;
    }
    next();
  } else if (to.meta.apiCatExists) {
    axiosCatAPI.get(('images/' + to.params.id))
      .then(() => {
        next()
      })
      .catch(() => {
        next('/cats');
      });
    return;
  } else if (to.meta.tffdbCatExists) {
    axiosTFFDB.get(('cats/' + to.params.id))
      .then(() => {
        next()
      })
      .catch(() => {
        next("/lostandfound");
      });
    return;
  } else {
    next();
  }
})

export default router
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import LoginPage from '../views/Login.vue';
import AnimePage from '../views/Anime.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/anime',
    name: 'Anime',
    component: AnimePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
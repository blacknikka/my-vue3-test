import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Memos from '@/views/memos.vue';
import AddMemo from '@/views/AddMemo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/memo',
    name: 'Memos',
    component: Memos,
  },
  {
    path: '/add',
    name: 'AddMemo',
    component: AddMemo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

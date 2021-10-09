import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Memos from '@/views/memos.vue';
import AddMemo from '@/views/AddMemo.vue';
import MemoDetails from '@/views/MemoDetails.vue';

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
  {
    path: '/memo/:id',
    name: 'MemoDetails',
    component: MemoDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Memos from '@/views/memos.vue';
import AddMemo from '@/views/AddMemo.vue';
import MemoDetails from '@/views/MemoDetails.vue';
import EditMemo from '@/views/EditMemo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
  {
    path: '/memo/:id/edit',
    name: 'EditMemo',
    component: EditMemo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

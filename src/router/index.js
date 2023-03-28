import { createRouter, createWebHistory } from 'vue-router';

import TodoList from '../components/TodoList.vue';
import StatPage from '../components/StatPage.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: TodoList,
  },
  {
    path: '/stat',
    name: 'Stat',
    component: StatPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from './layouts/Main.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: MainLayout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue'),
        },
      ],
    },
    {
      path: '/tic-tac-toe/:id',
      name: 'tic-tac-toe',
      component: () => import('./views/TicTacToe.vue'),
    },
  ],
});

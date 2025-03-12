import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserRegister from '../views/UserRegister.vue';
import UserLogin from '../views/UserLogin.vue';
import UserProfile from '../views/UserProfile.vue';
import TaskList from '../views/TaskList.vue';
import TaskDetail from '../Views/TaskDetail.vue';
import TaskAdd from '../views/TaskAdd.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'UserRegister',
      component: UserRegister,
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin,
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
    },
    {
      path: '/task-list',
      name: 'TaskList',
      component: TaskList,
    },
    {
      path: '/task-detail/:id',
      name: 'TaskDetail',
      component: TaskDetail,
    },
    {
      path: '/task-add',
      name: 'TaskAdd',
      component: TaskAdd,
    },
  ],
})

export default router

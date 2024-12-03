import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue');
import UserRegister from '@/views/UserRegister.vue';
import UserLogin from '@/views/UserLogin.vue';
import UserEdit from '@/views/UserEdit.vue';
import AddTask from '@/views/AddTask.vue';
import TaskList from '@/views/TaskList.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user-register',
    name: 'user-register',
    component: UserRegister
  },
  {
    path: '/user-login',
    name: 'user-login',
    component: UserLogin
  },
  {
    path: '/user-edit',
    name: 'user-edit',
    component: UserEdit
  },
  {
    path: '/add-task',
    name: 'add-task',
    component: AddTask
  },
  {
    path: '/task-list',
    name: 'TaskList',
    component: TaskList
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

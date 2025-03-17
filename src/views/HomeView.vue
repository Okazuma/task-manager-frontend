<template>
  <section class="p-4 w-full">
    <ThemeButton />
    <p class="text-center bg-gray-600 text-white my-2 rounded">Home</p>
    <p class="text-center py-2 dark:text-white font-bold">
      Hello, {{ userStore?.user?.name || 'Guest user' }} !!
    </p>
    <p v-if="!userStore?.user?.id" class="text-center py-2 dark:text-white font-bold">
      You need to log in.
    </p>
    <div
      class="w-[320px] h-[160px] flex justify-between mx-auto gap-2 py-4 sm:w-[560px] md:w-[620px] lg:w-[720px] font-titan"
    >
      <router-link
        :to="{ path: '/task-list', query: { type: 'today' } }"
        class="min-w-[100px] bg-gray-600 text-white flex items-center justify-center rounded py-2 hover:text-orange-400 sm:w-[180px] md:w-[200px] lg:w-[220px]"
        >Today<i class="fa-solid fa-calendar-week pl-1"></i
      ></router-link>
      <router-link
        :to="{ path: '/task-list', query: { type: 'work' } }"
        class="min-w-[100px] bg-gray-600 text-white flex items-center justify-center rounded py-2 hover:text-orange-400 sm:w-[180px] md:w-[200px] lg:w-[220px]"
        >Work<i class="fa-solid fa-laptop pl-1"></i
      ></router-link>
      <router-link
        :to="{ path: '/task-list', query: { type: 'personal' } }"
        class="min-w-[100px] bg-gray-600 text-white flex items-center justify-center rounded py-2 hover:text-orange-400 sm:w-[180px] md:w-[200px] lg:w-[220px]"
        >Personal<i class="fa-solid fa-person pl-1"></i
      ></router-link>
    </div>
    <div
      class="w-[280px] flex justify-between mx-auto gap-2 py-10 sm:w-[320px] md:w-[320px] lg:w-[400px] font-titan"
    >
      <router-link
        to="/task-add"
        class="min-w-[100px] bg-gray-600 text-white inline-block text-center rounded p-2 hover:text-orange-400"
        >Add<i class="fa-solid fa-pen pl-1"></i
      ></router-link>
      <button
        @click.prevent="handleLogout"
        class="min-w-[100px] bg-gray-600 text-white rounded p-2 hover:text-orange-400"
      >
        logout<i class="fa-solid fa-door-closed pl-1"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useTaskStore } from '../stores/task';
import { useRouter } from 'vue-router';
import { onMounted, watch } from 'vue';
import ThemeButton from '../components/ThemeButton.vue';

const userStore = useUserStore();
const taskStore = useTaskStore();
const router = useRouter();

const handleLogout = () => {
  if (!userStore.user.id) {
    alert('ログイン情報がありません');
    return;
  }
  if (!confirm('ログアウトしますか？')) {
    return;
  }
  userStore.logoutUser();
  alert('ログアウトしました');
  router.push('/login');
};

onMounted(() => {
  if (!userStore.user.id) {
    userStore.fetchUser();
  }
});

watch(
  () => userStore.user.id,
  async (newUserId, oldUserId) => {
    if (newUserId && newUserId !== oldUserId) {
      await taskStore.fetchTasks();
    }
  },
);
</script>

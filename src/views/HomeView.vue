<template>
  <section class="p-4 min-h-screen">
    <ThemeButton />
    <p class="text-center bg-gray-600 text-white mb-2 rounded">Home</p>
    <p class="text-center py-4 dark:text-white">Hello, {{userStore?.user?.name || 'Guest user'}} !!</p>
    <div class="w-[260px] flex justify-between mx-auto gap-2 py-10 sm:w-[300px] md:w-[400px] lg:w-[400px]">
      <router-link to="/task-list" class="min-w-[80px] bg-gray-600 text-white inline-block text-center rounded py-2 hover:text-orange-400">List</router-link>
      <router-link to="/task-add" class="min-w-[80px] bg-gray-600 text-white inline-block text-center rounded py-2 hover:text-orange-400">Add</router-link>
      <button @click.prevent="handleLogout" class="min-w-[80px] bg-gray-600 text-white rounded py-2 hover:text-orange-400">logout</button>
    </div>
  </section>
</template>


<script setup>
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import { onMounted , watch } from "vue";
import ThemeButton from "../components/ThemeButton.vue";


const userStore = useUserStore();
const taskStore = useTaskStore();
const router = useRouter();


const handleLogout = () => {
  if(!userStore.user.isAuthenticated){
    alert('ログイン情報がありません');
    return;
  }
  if(!confirm("ログアウトしますか？")){
    return ;
  }
  console.log(`🔥ログアウトするユーザー:${JSON.stringify(userStore.user, null, 2)}`);
  userStore.logoutUser();
  alert("ログアウトしました")
  router.push('/login');
};



onMounted(() => {
  if(!userStore.user.id){
    userStore.fetchUser();
  }
});

watch(() => userStore.user.id, async (newUserId ,oldUserId) => {
    if ( newUserId && newUserId !== oldUserId ){
        await taskStore.fetchTasks();
    }
});
</script>
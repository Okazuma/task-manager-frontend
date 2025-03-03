<template>
  <section class="p-4">
    <p class="text-center bg-gray-600 text-white mb-2">Home</p>
    <div class="w-[260px] flex justify-between mx-auto gap-2">
      <router-link to="/task-list" class="min-w-[72px] bg-gray-600 text-white px-4 inline-block text-center rounded">List</router-link>
      <router-link to="/task-add" class="min-w-[72px] bg-gray-600 text-white px-4 inline-block text-center rounded">Add</router-link>
      <button @click.prevent="handleLogout" class="min-w-[72px] bg-gray-600 text-white px-4 rounded">logout</button>
    </div>
  </section>
</template>


<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";


const userStore = useUserStore();
const router = useRouter();



const handleLogout = () => {
  if(!confirm("ログアウトしますか？")){
    return ;
  }
  console.log(`🔥ログアウトするユーザー:${JSON.stringify(userStore.user, null, 2)}`);
  userStore.logoutUser();

  alert("ログアウトしました")

  console.log("🔥ログアウトしたユーザー:", userStore.user);
  console.log("🔥ログアウトしたユーザーの認証状態:", userStore.isAuthenticated);

  router.push('/login');
};
</script>
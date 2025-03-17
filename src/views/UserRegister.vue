<template>
  <section class="p-4 w-full font-titan">
    <p class="text-center bg-gray-600 text-white mb-2 rounded">Register</p>
    <form @submit.prevent="handleRegister">
      <label for="name" class="block text-center py-2">
        <span>Name</span>
        <input
          id="name"
          type="text"
          v-model="userForm.name"
          class="text-gray-800 block mx-auto mb-2 px-2 border-2 rounded w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px]"
        />
      </label>
      <label for="email" class="block text-center py-2">
        <span>Email</span>
        <input
          id="email"
          type="email"
          v-model="userForm.email"
          class="text-gray-800 block mx-auto mb-2 px-2 border-2 rounded w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px]"
        />
      </label>
      <label for="password" class="block text-center py-2">
        <span>Password</span>
        <input
          id="password"
          type="password"
          v-model="userForm.password"
          class="text-gray-800 block mx-auto mb-2 px-2 border-2 rounded w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px]"
        />
      </label>
      <div
        class="flex justify-between mx-auto py-10 w-[280px] sm:w-[320px] md:w-[320px] lg:w-[400px]"
      >
        <router-link
          to="/"
          class="min-w-[100px] bg-gray-600 text-white p-2 block text-center rounded hover:text-orange-400"
          ><i class="fa-solid fa-left-long pr-1"></i>Back</router-link
        >
        <button
          type="submit"
          class="min-w-[100px] bg-gray-600 text-white p-2 block text-center rounded hover:text-orange-400"
        >
          Submit<i class="fa-solid fa-right-long pl-1"></i>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const userForm = ref({
  name: '',
  email: '',
  password: '',
});

const resetForm = () => {
  userForm.value = { name: '', email: '', password: '' };
};

const handleRegister = async () => {
  if (!userForm.value.name || !userForm.value.email || !userForm.value.password) {
    alert('全ての項目を入力してください');
    return;
  }

  try {
    await userStore.registerUser({
      name: userForm.value.name,
      email: userForm.value.email,
      password: userForm.value.password,
    });

    alert('登録が完了しました！');

    router.push('/login');
    resetForm();
  } catch (error) {
    console.error('❌handleRegister:ユーザー登録失敗:', error);
    alert('登録に失敗しました😢');
  }
};
</script>

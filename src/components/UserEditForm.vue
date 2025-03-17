<template>
  <form @submit.prevent="userStore.updateUser(userStore.editingUser)">
    <h1 class="text-gray-800 text-center text-xl mb-2 dark:text-white font-titan">User Edit</h1>

    <label for="name" class="text-gray-800 block text-center py-2 dark:text-white">
      <span class="font-titan">Name</span>
      <input
        id="name"
        type="text"
        v-model="userStore.editingUser.name"
        class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2 min-w-[260px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
      />
    </label>
    <label for="email" class="block text-center py-2 dark:text-white">
      <span class="font-titan">Email</span>
      <input
        id="email"
        type="email"
        v-model="userStore.editingUser.email"
        class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none min-w-[260px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
      />
    </label>
    <label for="hiddenForm" class="text-gray-800 block text-center pt-6 pb-4 dark:text-white">
      <input id="hiddenForm" type="checkbox" v-model="userStore.isPasswordChange" />
      <span class="pl-2 font-titan">Change Password</span>
    </label>

    <div v-if="userStore.isPasswordChange">
      <label
        for="text-gray-800 password"
        class="text-gray-800 block text-center py-2 dark:text-white"
      >
        <span class="font-titan">Password</span>
        <input
          id="password"
          type="password"
          v-model="userStore.editingUser.password"
          class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none min-w-[260px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
          placeholder="New password"
        />
      </label>
      <span class="text-gray-800 block text-center pb-2 text-sm dark:text-white font-titan"
        >※ No change if blank</span
      >
    </div>

    <div
      class="flex justify-between mx-auto py-4 w-full sm:w-[300px] md:w-[300px] lg:w-[380px] font-titan"
    >
      <button
        type="button"
        @click="userStore.closeModal"
        class="p-2 bg-gray-600 text-white rounded min-w-[100px] hover:text-orange-400"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="p-2 bg-gray-600 text-white rounded min-w-[100px] hover:text-orange-400"
      >
        Update
      </button>
    </div>
  </form>
</template>

<script setup>
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

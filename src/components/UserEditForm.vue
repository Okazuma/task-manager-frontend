<template>
    <form @submit.prevent="userStore.updateUser(userStore.editingUser)">
        <h1 class="text-gray-800 text-center text-xl mb-2 dark:text-white">User Edit</h1>

        <label for="name" class="text-gray-800 block text-center py-2 dark:text-white">Name</label>
        <input id="name" type="text" v-model="userStore.editingUser.name" class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2 sm:w-[300px] md:w-[400px] lg:w-[500px]">

        <label for="email" class="block text-center py-2 dark:text-white">Email</label>
        <input id="email" type="email" v-model="userStore.editingUser.email" class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none sm:w-[300px] md:w-[400px] lg:w-[500px]">

        <label for="hiddenForm" class="text-gray-800 block text-center pt-8 pb-4 dark:text-white">
            <input id="hiddenForm" type="checkbox" v-model="userStore.isPasswordChange">
        Change Password</label>

        <div v-if="userStore.isPasswordChange">
            <label for="text-gray-800 password" class="text-gray-800 block text-center py-2 dark:text-white">Password</label>
            <input id="password" type="password" v-model="userStore.editingUser.password" class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none sm:w-[300px] md:w-[400px] lg:w-[500px]" placeholder="New password">
            <span class="text-gray-800 block text-center py-1 text-sm dark:text-white">※ No change if blank</span>
        </div>

        <div class="flex justify-between mx-auto py-6 w-72">
            <button type="button" @click="userStore.closeModal" class="px-4 py-2 bg-gray-600 text-white rounded min-w-[100px] hover:text-orange-400">
                閉じる
            </button>
            <button type="submit" class="px-4 py-2 bg-gray-600 text-white rounded min-w-[100px] hover:text-orange-400">
                更新
            </button>
        </div>
    </form>
</template>


<script setup>
import { useUserStore } from '../stores/user'


const userStore = useUserStore();
</script>

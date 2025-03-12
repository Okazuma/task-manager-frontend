<template>
    <form @submit.prevent="userStore.updateUser(userStore.editingUser)">
        <h1 class="text-gray-800 text-center text-xl mb-2 dark:text-white">User Edit</h1>

        <label for="name" class="text-gray-800 block text-center py-2 dark:text-white">
            <span>Name</span>
            <input id="name" type="text" v-model="userStore.editingUser.name" class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2 sm:w-[300px] md:w-[400px] lg:w-[500px]">
        </label>
        <label for="email" class="block text-center py-2 dark:text-white">
            <span>Email</span>
            <input id="email" type="email" v-model="userStore.editingUser.email" class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none sm:w-[300px] md:w-[400px] lg:w-[500px]">
        </label>
        <label for="hiddenForm" class="text-gray-800 block text-center pt-6 pb-4 dark:text-white">
            <input id="hiddenForm" type="checkbox" v-model="userStore.isPasswordChange">
        <span class="pl-2">Change Password</span>
        </label>

        <div v-if="userStore.isPasswordChange">
            <label for="text-gray-800 password" class="text-gray-800 block text-center py-2 dark:text-white">
                <span>Password</span>
                <input id="password" type="password" v-model="userStore.editingUser.password" class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none sm:w-[300px] md:w-[400px] lg:w-[500px]" placeholder="New password">
            </label>

            <span class="text-gray-800 block text-center text-sm dark:text-white">※ No change if blank</span>
        </div>

        <div class="flex justify-between mx-auto py-4 w-72">
            <button type="button" @click="userStore.closeModal" class="px-4 py-2 bg-gray-600 text-white rounded min-w-[100px] hover:text-orange-400">
                Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-gray-600 text-white rounded min-w-[100px] hover:text-orange-400">
                Update
            </button>
        </div>
    </form>
</template>


<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore();
</script>

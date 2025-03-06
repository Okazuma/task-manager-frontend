<template>
    <form @submit.prevent="userStore.updateUser(userStore.editingUser)">
        <h1 class="text-center text-xl mb-2">User Edit</h1>

        <label for="name" class="block text-center py-2">Name</label>
        <input id="name" type="text" v-model="userStore.editingUser.name" class="block mx-auto border-2 border-gray-300 rounded outline-none px-2">

        <label for="email" class="block text-center py-2">Email</label>
        <input id="email" type="email" v-model="userStore.editingUser.email" class="block mx-auto px-2 border-2 border-gray-300 rounded outline-none appearance-none">


        <label for="hiddenForm" class="block text-center pt-8"><input name="hiddenForm" type="checkbox" v-model="userStore.isPasswordChange">
        パスワード変更</label>

        <div v-if="userStore.isPasswordChange">
            <label for="password" class="block text-center py-2">Password</label>
            <input id="password" type="password" v-model="userStore.editingUser.password" class="block mx-auto px-2 border-2 border-gray-300 rounded outline-none appearance-none" placeholder="新しいパスワードを入力">
            <span class="block text-center py-2">未入力なら変更なし</span>
        </div>

        <div class="flex justify-between mx-auto py-6 w-72 sm:w-[400px] md:w-[500px] lg:w-[700px]">
            <button type="button" @click="userStore.closeModal" class="mt-4 px-4 py-2 bg-gray-500 text-white rounded min-w-[120px] hover:bg-gray-700">
                閉じる
            </button>
            <button type="submit" class="mt-4 px-4 py-2 bg-gray-500 text-white rounded min-w-[120px] hover:bg-gray-700">
                更新
            </button>
        </div>
    </form>
</template>


<script setup>
import { useUserStore } from '../stores/user'


const userStore = useUserStore();
</script>

<template>
    <section class="p-4">
        <p class="text-center bg-gray-600 text-white mb-2">Login</p>
        <form @submit.prevent="handleLogin" class="">
            <label for="name" class="block text-center py-2">Name</label>
            <input id="name" type="text" v-model="userForm.name" class="block mx-auto px-2 border-2 rounded">
            <label for="email" class="block text-center py-2">Email</label>
            <input id="email" type="email" v-model="userForm.email" class="block mx-auto px-2 border-2 rounded">
            <label for="password" class="block text-center py-2">Password</label>
            <input id="password" type="password" v-model="userForm.password" class="block mx-auto px-2 border-2 rounded">
            <button type="submit" class="block bg-gray-300 rounded px-2 mx-auto my-4">Submit</button>
        </form>
    </section>
</template>


<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";


const userStore = useUserStore();
const router = useRouter();
const userForm = ref({
    name: '',
    email: '',
    password: '',
});



const resetForm = () => {
    userForm.value = { name: '', email: '', password: ''};
}



const handleLogin = () => {
    if(!userForm.value.name || !userForm.value.email || !userForm.value.password){
        alert('全項目を入力してください');
        return ;
    };

    console.log(`🔥ログインするユーザー:${JSON.stringify(userForm.value, null, 2)}`);

    userStore.loginUser({
    name: userForm.value.name,
    email: userForm.value.email,
    password: userForm.value.password,
    });

    alert("ログインが完了しました！");

    console.log(`🔥ログインしたユーザー:${JSON.stringify(userForm.value, null, 2)}`);
    console.log(`🔥ログインしたユーザーの認証状態:${userStore.isAuthenticated}`);

    if(userStore.isAuthenticated){
        router.push("/");
    };
    resetForm();
};
</script>
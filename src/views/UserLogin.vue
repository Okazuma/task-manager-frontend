<template>
    <section class="p-4 min-h-screen">
        <p class="text-center bg-gray-600 text-white mb-2 rounded">Login</p>
        <form @submit.prevent="handleLogin" class="">
            <label for="name" class="block text-center py-2">Name</label>
            <input id="name" type="text" v-model="userForm.name" class="text-gray-800 block mx-auto mb-2 px-2 border-2 rounded sm:w-[300px] md:w-[400px] lg:w-[500px]">
            <label for="email" class="block text-center py-2">Email</label>
            <input id="email" type="email" v-model="userForm.email" class="text-gray-800 block mx-auto mb-2 px-2 border-2 rounded sm:w-[300px] md:w-[400px] lg:w-[500px]">
            <label for="password" class="block text-center py-2">Password</label>
            <input id="password" type="password" v-model="userForm.password" class="text-gray-800 block mx-auto mb-2 px-2 border-2 rounded sm:w-[300px] md:w-[400px] lg:w-[500px]">
            <div class="flex justify-between mx-auto py-10 w-72 sm:w-[400px] md:w-[500px] lg:w-[700px]">
                <router-link to="/" class="w-fit min-w-[100px] bg-gray-600 text-white  mx-auto px-4 py-2 block text-center rounded hover:text-orange-400">Back</router-link>
                <button type="submit" class="w-fit min-w-[100px] bg-gray-600 text-white  mx-auto block text-center rounded px-4 py-2 hover:text-orange-400">Submit</button>
            </div>
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



const handleLogin = async () => {
    if(!userForm.value.name || !userForm.value.email || !userForm.value.password){
        alert('全項目を入力してください');
        return ;
    };

    console.log(`🔥ログインするユーザー:${JSON.stringify(userForm.value, null, 2)}`);
    try{
        await userStore.loginUser({
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password,
        });

        alert("ログインが完了しました！");
        console.log("🔥 現在のクッキー: ", document.cookie);

        if(userStore.isAuthenticated){
            router.push("/");
        }
        resetForm();
    }catch (error){
        console.error('❌handleLogin:ログイン失敗',error);
        alert('ログインに失敗しました');
    }
};
</script>
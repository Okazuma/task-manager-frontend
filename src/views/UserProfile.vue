<template>
    <section class="p-4">
        <p class="text-center bg-gray-600 text-white mb-2 rounded">Login</p>
            <div class="">
                <span for="name" class="block text-center py-2 border-b-2">Name</span>
                <span class="block text-center mb-2 px-2">{{userStore?.user?.name ||  'Guest user'}}</span>
            </div>
            <div class="py-2">
                <span for="email" class="block text-center py-2 border-b-2">Email</span>
                <span class="block text-center mb-2 px-2">{{userStore?.user?.email ||  'Not available...'}}</span>
            </div>
            <div class="w-[260px] flex justify-between gap-2 mx-auto py-10 sm:w-[300px] md:w-[400px] lg:w-[400px]">
                <router-link to="/" class="min-w-[80px] bg-gray-600 text-white text-center rounded py-2 hover:text-orange-400">Back</router-link>
                <button @click="editUser()" class="min-w-[80px]  bg-gray-600 text-white block text-center rounded py-2 hover:text-orange-400">Edit</button>
                <button @click="removeUser()" class="min-w-[80px]  bg-gray-600 text-white block text-center rounded py-2 hover:text-orange-400">Delete</button>
            </div>
            <EditModal v-if="userStore.isOpen">
                <UserEditForm />
            </EditModal>
    </section>
</template>


<script setup>
import { useUserStore } from "../stores/user";
import EditModal from '../components/EditModal.vue';
import UserEditForm from "../components/UserEditForm.vue";
import { onMounted } from "vue";


const userStore = useUserStore();


const editUser = () => {
    if(!userStore.user){
        alert('ログイン情報がありません')
        return;
    }
    console.log('🔥モーダルに渡す編集するUser:',userStore.user);
    userStore.openModal();
};



const removeUser = async () => {
    if(!userStore.user){
        alert('ログイン情報がありません');
        return;
    }
    console.log('🔥removeUser:削除するユーザー:',userStore.user);
    if(confirm('ユーザーを削除しますか？')){
        try{
            await userStore.deleteUser();
            console.log('✅ removeUser: ユーザー削除リクエスト成功');
        }catch (error){
            console.error('❌removeUser:ユーザー削除の失敗',error);
        }
    }else{
        console.log('🔥removeUser:ユーザー削除のキャンセル');
    }
};



onMounted(() => {
    if(!userStore.user.id){
        userStore.fetchUser();
    }
});
</script>
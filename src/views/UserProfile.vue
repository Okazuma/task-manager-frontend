<template>
    <section class="p-4">
        <p class="text-center bg-gray-600 text-white mb-2">Login</p>

            <label for="name" class="block text-center py-2 border-b-2">Name</label>

            <span class="block text-center px-2">{{userStore?.user?.name ||  'Guest user'}}</span>
            <label for="email" class="block text-center py-2 border-b-2">Email</label>

            <span class="block text-center px-2">{{userStore?.user?.email ||  'Not logged or undefined'}}</span>

            <div class="flex gap-2 px-2 py-6">
                <button @click="editUser(userStore.user)" class="min-w-[72px] w-20 bg-gray-600 text-white  mx-auto block text-center rounded ">Edit</button>
                <button @click="removeUser(userStore.user.id)" class="min-w-[72px] w-20 bg-gray-600 text-white  mx-auto block text-center rounded ">Delete</button>
                <router-link to="/" class="w-fit min-w-[72px] bg-gray-600 text-white text-sm   mx-auto block text-center rounded">戻る</router-link>
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


const editUser = (user) => {
    if(!user){
        return;
    }
    console.log('🔥モーダルに渡す編集するUser:',user);
    userStore.openModal(user);
};



const removeUser = async (userId) => {
    if(!userId) return;
    console.log('🔥removeUser:削除するユーザー:',userId);
    if(confirm('ユーザーを削除しますか？')){
        try{
            await userStore.deleteUser(userId);
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
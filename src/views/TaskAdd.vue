<template>
    <section class="p-4">
        <p class="text-center bg-gray-600 text-white mb-2">TaskAdd</p>
        <form @submit.prevent="addTask" class="" >
            <div>
                <label for="taskName" class="block text-center">Name</label>
                <input type="text" id="taskName" v-model="taskContent.taskName" class="block mx-auto">
            </div>
            <div>
                <label for="taskDetail" class="block text-center">Detail</label>
                <textarea name="" id="taskDetail" v-model="taskContent.taskDetail" cols="30" rows="10" class="block mx-auto"></textarea>
            </div>
            <div>
                <label for="taskDeadline" class="block text-center">Deadline</label>
                <input type="date" id="taskDeadline" v-model="taskContent.taskDeadline" class="block mx-auto">
            </div>

            <div class="flex">
                <button type="submit" class="w-fit min-w-[72px] bg-gray-600 text-white px-4 mx-auto block text-center rounded">作成</button>
                <router-link to="/" class="w-fit min-w-[72px] bg-gray-600 text-white text-sm  px-4 mx-auto block text-center rounded">戻る</router-link>
            </div>
        </form>
    </section>
</template>


<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";


const taskStore = useTaskStore();
const userStore = useUserStore();
const router = useRouter();
const taskContent = ref({
    taskName: '',
    taskDetail:'',
    taskDeadline: '',
});



const addTask = async () =>{
    if(!taskContent.value.taskName || !taskContent.value.taskDetail || !taskContent.value.taskDeadline){
        alert('全ての項目を入力してください');
        return;
    }
    if(!userStore.user.id) {
        alert('ログインが必要です');
        router.push('/login');
        return;
    }
    const newTask = {
        id:crypto.randomUUID(),
        name: taskContent.value.taskName,
        detail: taskContent.value.taskDetail,
        deadline: taskContent.value.taskDeadline,
        user_id : userStore.user.id,
    };
    console.log(`🔥作成するtask:${JSON.stringify(newTask , null , 2)}`);
    try{
        await taskStore.createTask(newTask);
        alert('タスクを作成しました');

        taskContent.value = {
            taskName: '',
            taskDetail: '',
            taskDeadline: '',
        };
        router.push('/task-list');
    }catch (error){
        console.error('タスク作成失敗:', error);
        alert('タスク作成に失敗しました');
    }
};
</script>
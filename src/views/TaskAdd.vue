<template>
    <section class="p-4 min-h-screen">
        <p class="text-center bg-gray-600 text-white mb-2 rounded">TaskAdd</p>
        <form @submit.prevent="addTask" class="" >
            <div class="mb-2">
                <label for="taskName" class="block text-center">Name</label>
                <input type="text" id="taskName" v-model="taskContent.taskName" class="text-gray-800 block mx-auto border-2 border-gray-300 rounded  px-2 w-72 sm:w-[400px] md:w-[500px] lg:w-[700px]">
            </div>
            <div class="mb-2">
                <label for="taskDetail" class="block text-center">Detail</label>
                <textarea name="" id="taskDetail" v-model="taskContent.taskDetail" class="text-gray-800 block mx-auto rounded w-72 h-40  border-2 border-gray-300 p-2 sm:w-[400px] md:w-[500px] lg:w-[700px] sm:h-40 md:h-48 lg:h-56"></textarea>
            </div>
            <div class="mb-2">
                <label for="taskDeadline" class="block text-center">Deadline</label>
                <input type="date" id="taskDeadline" v-model="taskContent.taskDeadline" class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2">
            </div>
            <div class="flex justify-between mx-auto py-4 w-72 sm:w-[400px] md:w-[500px] lg:w-[700px]">
                <router-link to="/" class="w-fit min-w-[100px] bg-gray-600 text-white mx-auto block text-center rounded py-2 hover:text-orange-400 appearance-none">Back</router-link>
                <button type="submit" class="w-fit min-w-[100px] bg-gray-600 text-white  mx-auto block text-center rounded py-2 hover:text-orange-400">作成</button>
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
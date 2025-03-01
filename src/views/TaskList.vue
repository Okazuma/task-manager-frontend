<template>
    <section class="p-4">
        <p class="text-center bg-gray-600 text-white mb-2">TaskList</p>
        <ul v-if="taskStore.tasks.length">
            <li v-for="task in taskStore.tasks" :key="task.id" class="flex justify-between">
                <div class="flex justify-between">
                    <span class="px-2 inline-block">{{task.name}}</span>
                    <span class="px-2 inline-block">{{task.detail}}</span>
                    <span class="px-2 inline-block">{{task.deadline}}</span>
                </div>
                <div class="flex gap-2 px-2">
                    <button @click="editTask(task)" class="min-w-[72px] w-20 bg-gray-600 text-white px-4 mx-auto block text-center rounded ">Edit</button>
                    <button @click="removeTask(task.id)" class="min-w-[72px] w-20 bg-gray-600 text-white px-4 mx-auto block text-center rounded ">Delete</button>
                </div>
            </li>
        </ul>
        <p v-else>タスクがありません</p>
        <EditModal v-if="taskStore.isOpen">
            <TaskEditForm />
        </EditModal>
        <router-link to="/" class="w-fit min-w-[72px] bg-gray-600 text-white px-4 mx-auto block text-center rounded">戻る</router-link>
    </section>
</template>


<script setup>
import { useTaskStore } from "../stores/task";
import EditModal from '../components/EditModal.vue';
import TaskEditForm from "../components/TaskEditForm.vue";


const taskStore = useTaskStore();



const removeTask = (taskId)=>{
    if(!taskId){
        return;
    }
    if(confirm(`タスク:${taskId}を削除しますか？`)){
        taskStore.deleteTask(taskId);
        console.log(`🔥削除したtask:${taskId}`);
    }
}

const editTask = (task) => {
    if(!task){
        return;
    }
    console.log(`🔥モーダルに渡す編集するtask:${JSON.stringify(task, null, 2)}`)
    taskStore.openModal(task);
}
</script>
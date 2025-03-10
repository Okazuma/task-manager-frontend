<template>
    <section class="p-4 min-h-scree dark:bg-gray-800n">
        <p class="text-center bg-gray-600 text-white mb-2 rounded">TaskList</p>
        <ul v-if="taskStore.tasks.length">
            <li v-for="task in taskStore.tasks" :key="task.id" class="flex justify-between py-1">
                <div class="flex justify-between">
                    <span class="px-2 inline-block">{{task.name}}</span>
                    <span class="px-2 inline-block">{{task.detail}}</span>
                    <span class="px-2 inline-block">{{task.deadline}}</span>
                </div>
                <div class="flex gap-2 ">
                    <button @click="editTask(task)" class="min-w-[72px] w-16 bg-gray-600 text-white mx-auto block text-center rounded text-sm hover:text-orange-400">Edit</button>
                    <button @click="removeTask(task.id)" class="min-w-[72px] w-16 bg-gray-600 text-white mx-auto block text-center rounded text-sm hover:text-orange-400">Delete</button>
                </div>
            </li>
        </ul>
        <p v-else class="text-center py-4">No tasks...</p>
            <EditModal v-if="taskStore.isOpen">
                <TaskEditForm />
            </EditModal>
            <div class="w-[260px] flex justify-between mx-auto gap-2 py-10 sm:w-[300px] md:w-[400px] lg:w-[400px]">
                <router-link to="/" class="w-fit min-w-[72px] bg-gray-600 text-white px-4 mx-auto block text-center rounded py-2 hover:bg-gray-700">戻る</router-link>
        </div>
    </section>
</template>


<script setup>
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import EditModal from '../components/EditModal.vue';
import TaskEditForm from "../components/TaskEditForm.vue";
import { onMounted , watch } from "vue";


const userStore = useUserStore();
const taskStore = useTaskStore();


const removeTask = (taskId)=>{
    if(!taskId){
        return;
    }
    console.log(`🔥削除するtask:${taskId}`);
    if(confirm(`タスク:${taskId}を削除しますか？`)){
        taskStore.deleteTask(taskId);
    }
};



const editTask = (task) => {
    if(!task){
        return;
    }
    console.log(`🔥モーダルに渡す編集するtask:${JSON.stringify(task, null, 2)}`)
    taskStore.openModal(task);
};



onMounted(() => {
    if(!userStore.user.id){
        userStore.fetchUser();
    }
    if(taskStore.tasks.length === 0){
        taskStore.fetchTasks();
    }
});


watch(() => userStore.user.id, async (newUserId ,oldUserId) => {
    if ( newUserId && newUserId !== oldUserId ){
        await taskStore.fetchTasks();
    }

});
</script>
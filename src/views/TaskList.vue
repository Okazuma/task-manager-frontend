<template>
    <section class="w-full min-h-screen p-4 dark:bg-gray-800">
        <p class="text-center bg-gray-600 text-white mb-2 rounded">TaskList</p>
        <ul v-if="taskStore.tasks.length" class="w-full">
            <li v-for="task in filteredTasks" :key="task.id" class="flex justify-between py-1 w-full">
                <div class="flex justify-between w-full px-2">
                    <span class="px-2">{{task.name}}</span>
                    <router-link :to="{path:`/task-detail/${task.id}`, query:{from: route.query.type}}" class="bg-gray-600 text-white px-2 rounded hover:text-orange-400">Open<i class="fa-solid fa-folder-open pl-1"></i></router-link>
                </div>
                <div class="flex gap-2  min-w-[140px] max-w-[180px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[400px]">

                    <button @click="editTask(task)" class="min-w-[64px] bg-gray-600 text-white mx-auto block text-center rounded text-sm hover:text-orange-400 sm:w-[80px] md:w-[100px] lg:w-[160px]">Edit<i class="fa-solid fa-file-pen pl-1"></i></button>
                    <button @click="removeTask(task.id)" class="min-w-[64px] bg-gray-600 text-white mx-auto block text-center rounded text-sm hover:text-orange-400 sm:w-[80px] md:w-[100px] lg:w-[160px]">Delete<i class="fa-solid fa-trash pl-1"></i></button>
                </div>
            </li>
        </ul>
        <p v-else class="text-center py-4">No tasks...</p>
            <EditModal v-if="taskStore.isOpen">
                <TaskEditForm />
            </EditModal>
            <div class="w-[260px] flex justify-between mx-auto gap-2 py-10 sm:w-[300px] md:w-[400px] lg:w-[400px]">
                <router-link to="/" class="w-fit min-w-[72px] bg-gray-600 text-white px-4 mx-auto block text-center rounded py-2 hover:text-orange-400"><i class="fa-solid fa-left-long pr-1"></i>Back</router-link>
        </div>
    </section>
</template>


<script setup>
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import EditModal from '../components/EditModal.vue';
import TaskEditForm from "../components/TaskEditForm.vue";
import { onMounted , watch , computed } from "vue";
import { useRoute } from "vue-router";


const userStore = useUserStore();
const taskStore = useTaskStore();
const route = useRoute();

const isToday = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
};

const filteredTasks = computed(() => {
    const type = route.query.type;
    if(type === 'today'){
        return taskStore.tasks.filter(task => isToday(task.deadline));
    }else if (type === 'work'){
        return taskStore.tasks.filter(task => task.category_id === 1);
    }else if (type === 'personal'){
        return taskStore.tasks.filter(task => task.category_id === 2);
    }
    return [];
})



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

watch(() => taskStore.tasks, () => {
    console.log('Updated tasks:', taskStore.tasks);
});
</script>
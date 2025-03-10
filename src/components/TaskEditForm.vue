<template>
    <form @submit.prevent="taskStore.updateTask">
        <h1 class="text-gray-800 text-center text-xl mb-2 dark:text-white">Task Edit</h1>
        <div class="mb-2">
            <label for="taskName" class="text-gray-800 block text-center dark:text-white">Name</label>
            <input type="text" v-model="taskStore.editingTask.name" id="taskName" class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2 w-72 sm:w-[400px] md:w-[500px] lg:w-[700px]">
        </div>
        <div class="mb-2">
            <label for="taskDetail" class="text-gray-800 block text-center dark:text-white">Detail</label>
            <textarea v-model="taskStore.editingTask.detail" id="taskDetail" class="text-gray-800 block mx-auto rounded w-72 h-40  border-2 border-gray-300 p-2 sm:w-[400px] md:w-[500px] lg:w-[700px] sm:h-40 md:h-48 lg:h-56">
        </textarea>
        </div>
        <div class="mb-2">
        <label for="taskDeadline" class="text-gray-800 block text-center dark:text-white">Deadline</label>
        <input type="date" v-model="taskStore.editingTask.deadline" id="taskDeadline" class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none">
        </div>
        <div class="flex justify-between align-center mx-auto py-4 w-72 ">
            <button type="button" @click="taskStore.closeModal" class=" px-4 py-2 bg-gray-600 text-white rounded min-w-[120px] hover:text-orange-400">
                閉じる
            </button>
            <button type="submit" class=" px-4 py-2 bg-gray-600 text-white rounded min-w-[120px] hover:text-orange-400">
                更新
            </button>
        </div>
    </form>
</template>


<script setup>
import {useTaskStore} from "../stores/task";


const taskStore = useTaskStore();
</script>
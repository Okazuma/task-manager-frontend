<template>
    <form @submit.prevent="taskStore.updateTask">
        <h1 class="text-gray-800 text-center text-xl mb-2 dark:text-white">Task Edit</h1>

        <label for="taskName" class="text-gray-800 block text-center py-2 dark:text-white">
            <span>Name</span>
            <input type="text" v-model="taskStore.editingTask.name" id="taskName" class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2 w-72 sm:w-[400px] md:w-[500px] lg:w-[700px]">
        </label>
        <label for="taskDetail" class="text-gray-800 block text-center py-2 dark:text-white">
            <span>Detail</span>
            <textarea v-model="taskStore.editingTask.detail" id="taskDetail" class="text-gray-800 block mx-auto rounded w-72 h-40  border-2 border-gray-300 p-2 sm:w-[400px] md:w-[500px] lg:w-[700px] sm:h-40 md:h-48 lg:h-56">
            </textarea>
        </label>
        <div class="py-2 flex justify-between w-72 mx-auto px-8">
            <label for="workCategory">
                <input type="radio" id="workCategory" v-model="taskStore.editingTask.category_id" :value="1" class="text-gray-800 border-2 border-gray-300 rounded">
            <span class="pl-2">Work</span>
            </label>
            <label for="personalCategory">
                <input type="radio" id="personalCategory" v-model="taskStore.editingTask.category_id" :value="2" class="text-gray-800 border-2 border-gray-300 rounded">
                <span class="pl-2">Personal</span>
            </label>
        </div>
        <label for="taskDeadline" class="text-gray-800 block text-center py-2 dark:text-white">
            <span>Deadline</span>
            <input type="date" v-model="taskStore.editingTask.deadline" id="taskDeadline" class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none">
        </label>

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
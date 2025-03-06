<template>
    <form @submit.prevent="taskStore.updateTask">
        <h1 class="text-center text-xl mb-2">Task Edit</h1>
        <input type="text" v-model="taskStore.editingTask.name" class="block mx-auto border-2 border-gray-300 rounded outline-none my-2 px-2">

        <textarea v-model="taskStore.editingTask.detail" class="block mx-auto rounded w-72 h-40  border-2 border-gray-300 my-2 p-2 outline-none sm:w-[400px] md:w-[500px] lg:w-[700px] sm:h-40 md:h-48 lg:h-56">
        </textarea>

        <input type="date" v-model="taskStore.editingTask.deadline" class="block mx-auto my-2 px-2 border-2 border-gray-300 rounded outline-none appearance-none">

        <div class="flex justify-between mx-auto w-72 sm:w-[400px] md:w-[500px] lg:w-[700px]">
            <button type="button" @click="taskStore.closeModal" class="mt-4 px-4 py-2 bg-gray-500 text-white rounded min-w-[120px] hover:bg-gray-700">
                閉じる
            </button>
            <button type="submit"  class="mt-4 px-4 py-2 bg-gray-500 text-white rounded min-w-[120px] hover:bg-gray-700">
                更新
            </button>
        </div>
    </form>
</template>


<script setup>
import {useTaskStore} from "../stores/task";


const taskStore = useTaskStore();
</script>
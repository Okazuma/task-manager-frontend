<template>
  <form @submit.prevent="taskStore.updateTask">
    <h1 class="text-gray-800 text-center text-xl mb-2 dark:text-white font-titan">Task Edit</h1>

    <label for="taskName" class="text-gray-800 block text-center py-2 dark:text-white">
      <span class="font-titan">Name</span>
      <input
        type="text"
        v-model="taskStore.editingTask.name"
        id="taskName"
        class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2 min-w-[260px] sm:w-[400px] md:w-[500px] lg:w-[540px]"
      />
    </label>
    <label for="taskDetail" class="text-gray-800 block text-center py-2 dark:text-white">
      <span class="font-titan">Detail</span>
      <textarea
        v-model="taskStore.editingTask.detail"
        id="taskDetail"
        class="text-gray-800 block mx-auto rounded min-w-[260px] h-40 border-2 border-gray-300 p-2 sm:w-[400px] md:w-[500px] lg:w-[540px] sm:h-40 md:h-40 lg:h-40"
      >
      </textarea>
    </label>
    <div class="py-2 flex justify-between min-w-[260px] mx-auto px-8">
      <label for="workCategory">
        <input
          type="radio"
          id="workCategory"
          v-model="taskStore.editingTask.category_id"
          :value="1"
          class="text-gray-800 border-2 border-gray-300 rounded"
        />
        <span class="pl-2 font-titan">Work</span>
      </label>
      <label for="personalCategory">
        <input
          type="radio"
          id="personalCategory"
          v-model="taskStore.editingTask.category_id"
          :value="2"
          class="text-gray-800 border-2 border-gray-300 rounded"
        />
        <span class="pl-2 font-titan">Personal</span>
      </label>
    </div>
    <label for="taskDeadline" class="text-gray-800 block text-center py-2 dark:text-white">
      <span class="font-titan">Deadline</span>
      <input
        type="date"
        v-model="taskStore.editingTask.deadline"
        id="taskDeadline"
        class="text-gray-800 block mx-auto px-2 border-2 border-gray-300 rounded appearance-none"
      />
    </label>

    <div
      class="flex justify-between mx-auto py-4 w-full sm:w-[300px] md:w-[300px] lg:w-[380px] font-titan"
    >
      <button
        type="button"
        @click="taskStore.closeModal"
        class="px-4 py-2 bg-gray-600 rounded min-w-[100px] hover:text-orange-400 font-titan"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-gray-600 rounded min-w-[100px] hover:text-orange-400"
      >
        Update
      </button>
    </div>
  </form>
</template>

<script setup>
import { useTaskStore } from '../stores/task';

const taskStore = useTaskStore();
</script>

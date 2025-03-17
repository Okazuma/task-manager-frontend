<template>
  <section
    v-if="taskStore.isOpen || userStore.isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg min-w-[260px] sm:w-[500px] md:w-[600px] lg:w-[600px] dark:bg-gray-800 dark:border-2 dark:border-gray-500"
    >
      <slot />
    </div>
  </section>
</template>

<script setup>
import { useTaskStore } from '../stores/task';
import { useUserStore } from '../stores/user';

const taskStore = useTaskStore();
const userStore = useUserStore();
</script>

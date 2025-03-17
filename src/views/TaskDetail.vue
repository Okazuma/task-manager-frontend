<template>
  <section>
    <p class="text-center font-titan">Task Detail</p>
    <div v-if="task">
      <div class="block text-center">
        <span class="block pt-4 font-titan">task name</span>
        <span class="block py-2 border-2 font-bold">{{ task.name }}</span>
      </div>
      <div class="block text-center text-white">
        <span class="block pt-4 font-titan">task detail</span>
        <span class="block py-2 border-2 font-bold">{{ task.detail }}</span>
      </div>
      <div class="block text-center">
        <span class="block pt-4 font-titan">task detail</span>
        <span class="block py-2 border-2 font-bold">{{ task.deadline }}</span>
      </div>
    </div>
    <p v-else class="text-white">Loading...</p>
    <button
      @click="goBack"
      class="w-fit min-w-[72px] bg-gray-600 px-4 mx-auto block text-center rounded my-8 py-2 hover:bg-gray-700 hover:text-orange-400"
    >
      <i class="fa-solid fa-left-long pr-1"></i>Back
    </button>
  </section>
</template>

<script setup>
import { useTaskStore } from '../stores/task';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watchEffect } from 'vue';

const taskStore = useTaskStore();
const route = useRoute();
const router = useRouter();
const task = ref(null);

const goBack = () => {
  let previousPage;
  if (route.query.from === 'today') {
    previousPage = '/task-list?type=today';
  } else if (route.query.from === 'work') {
    previousPage = '/task-list?type=work';
  } else if (route.query.from === 'personal') {
    previousPage = '/task-list?type=personal';
  }
  router.push(previousPage);
};

onMounted(async () => {
  if (taskStore.tasks.length === 0) {
    await taskStore.fetchTasks();
  }
});

watchEffect(() => {
  task.value = taskStore.tasks.find((task) => task.id === Number(route.params.id));
});
</script>

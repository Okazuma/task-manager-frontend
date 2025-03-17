<template>
  <section class="p-4 w-full">
    <p class="text-center bg-gray-600 text-white mb-2 rounded font-titan">TaskAdd</p>
    <form @submit.prevent="addTask" class="">
      <label for="taskName" class="block text-center py-2">
        <span class="font-titan">Name</span>
        <input
          type="text"
          id="taskName"
          v-model="taskContent.taskName"
          class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2 w-72 sm:w-[400px] md:w-[500px] lg:w-[700px]"
        />
      </label>
      <label for="taskDetail" class="block text-center py-2">
        <span class="font-titan">Detail</span>
        <textarea
          name=""
          id="taskDetail"
          v-model="taskContent.taskDetail"
          class="text-gray-800 block mx-auto rounded w-72 h-40 border-2 border-gray-300 p-2 sm:w-[400px] md:w-[500px] lg:w-[700px] sm:h-32 md:h-32 lg:h-32"
        ></textarea>
      </label>
      <div class="py-2 flex justify-between w-72 mx-auto px-8">
        <label for="workCategory">
          <input
            type="radio"
            id="workCategory"
            v-model="taskContent.taskCategory_id"
            :value="1"
            class="text-gray-800 border-2 border-gray-300 rounded"
          />
          <span class="pl-2 font-titan">Work</span>
        </label>
        <label for="personalCategory">
          <input
            type="radio"
            id="personalCategory"
            v-model="taskContent.taskCategory_id"
            :value="2"
            class="text-gray-800 border-2 border-gray-300 rounded"
          />
          <span class="pl-2 font-titan">Personal</span>
        </label>
      </div>
      <label for="taskDeadline" class="block text-center py-2">
        <span class="font-titan">Deadline</span>
        <input
          type="date"
          id="taskDeadline"
          v-model="taskContent.taskDeadline"
          class="text-gray-800 block mx-auto border-2 border-gray-300 rounded px-2"
        />
      </label>
      <div
        class="flex justify-between mx-auto py-4 w-[280px] sm:w-[320px] md:w-[480px] lg:w-[560px] font-titan"
      >
        <router-link
          to="/"
          class="w-fit min-w-[120px] bg-gray-600 text-white mx-auto block text-center rounded py-2 hover:text-orange-400 appearance-none"
          ><i class="fa-solid fa-left-long pr-1"></i>Back</router-link
        >
        <button
          type="submit"
          class="w-fit min-w-[120px] bg-gray-600 text-white mx-auto block text-center rounded py-2 hover:text-orange-400"
        >
          Create<i class="fa-solid fa-right-long pl-1"></i>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/task';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const taskStore = useTaskStore();
const userStore = useUserStore();
const router = useRouter();
const taskContent = ref({
  taskName: '',
  taskDetail: '',
  taskCategory_id: 1,
  taskDeadline: '',
});

const addTask = async () => {
  if (
    !taskContent.value.taskName ||
    !taskContent.value.taskDetail ||
    !taskContent.value.taskCategory_id ||
    !taskContent.value.taskDeadline
  ) {
    alert('全ての項目を入力してください');
    return;
  }
  if (!userStore.user.id) {
    alert('ログインが必要です');
    router.push('/login');
    return;
  }
  const newTask = {
    id: crypto.randomUUID(),
    name: taskContent.value.taskName,
    detail: taskContent.value.taskDetail,
    category_id: taskContent.value.taskCategory_id,
    deadline: taskContent.value.taskDeadline,
    user_id: userStore.user.id,
  };
  try {
    await taskStore.createTask(newTask);
    alert('タスクを作成しました');

    taskContent.value = {
      taskName: '',
      taskDetail: '',
      taskCategory_id: 1,
      taskDeadline: '',
    };
    router.push('/task-list');
  } catch (error) {
    console.error('タスク作成失敗:', error);
    alert('タスク作成に失敗しました');
  }
};
</script>

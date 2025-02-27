<template>
  <section class="p-4">
    <p class="text-center bg-gray-600 text-white mb-2">Home</p>
    <div class="w-[260px] flex justify-between mx-auto gap-2">
      <router-link to="/task-list" class="min-w-[72px] bg-gray-600 text-white px-4 inline-block text-center rounded">List</router-link>
      <router-link to="/task-add" class="min-w-[72px] bg-gray-600 text-white px-4 inline-block text-center rounded">Add</router-link>
      <button class="min-w-[72px] bg-gray-600 text-white px-4 rounded">logout</button>
    </div>
  </section>
</template>


<script setup>
</script>
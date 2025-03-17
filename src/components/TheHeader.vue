<template>
  <div class="w-screen bg-gray-600 text-white text-center py-4">
    <h1 class="text-6xl py-4 font-titan">Task Manager</h1>
    <nav class="w-[300px] flex justify-between mx-auto gap-4 font-titan">
      <router-link to="/" class="">Home</router-link>
      <router-link to="/register" class="">Register</router-link>
      <router-link to="/login" class="">Login</router-link>
      <router-link to="/profile" class="">Profile</router-link>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped>
.router-link-active {
  color: #fb923c;
}
</style>

<template>
  <header>
    <div class="min-h-screen w-screen bg-gray-200 text-gray-800" >
      <TheHeader />
      <router-view />

    </div>
  </header>


</template>

<script setup>
import TheHeader from './components/TheHeader.vue';

</script>




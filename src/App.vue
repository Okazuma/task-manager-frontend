<template>
<body>
  <header>
    <div class="min-h-screen w-screen bg-gray-100 text-gray-800">
      <TheHeader />
      <router-view />
    </div>
  </header>
</body>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
</script>

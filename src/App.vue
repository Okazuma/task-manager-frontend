<template>
  <header>
    <div :class="{ 'dark': themeStore.isDark }" class="min-h-screen w-screen bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white">
      <TheHeader />
      <router-view />
    </div>
  </header>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import { useThemeStore } from "./stores/theme";

const themeStore = useThemeStore();

</script>

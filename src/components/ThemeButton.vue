<template>
    <div class="p-4">
        <button @click="themeStore.isDark = !themeStore.isDark" class="block m-auto py-2 px-4 rounded bg-gray-600 text-white dark:bg-gray-600 dark:text-white">
            {{themeStore.isDark ? 'Dark Theme 🌙 ' : 'Light Theme ☀️'}}
        </button>
    </div>
</template>


<script setup>
import { useThemeStore } from "../stores/theme";


const themeStore = useThemeStore();
</script>

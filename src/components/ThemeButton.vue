<template>
    <div class="py-2">
        <button @click="themeStore.isDark = !themeStore.isDark" class="block m-auto py-2 px-4 rounded bg-gray-600 text-white dark:bg-gray-600 dark:text-white hover:text-orange-400 dark:hover:text-orange-400">
            {{themeStore.isDark ? 'Dark Theme 🌙 ' : 'Light Theme ☀️'}}
        </button>
    </div>
</template>


<script setup>
import { useThemeStore } from "../stores/theme";

const themeStore = useThemeStore();
</script>

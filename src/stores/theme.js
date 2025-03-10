import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(localStorage.getItem('theme') === 'dark');

    watchEffect(() => {
        localStorage.setItem("theme", isDark.value ? "dark" : "light");
        document.documentElement.classList.toggle('dark', isDark.value);
    });

    return {
        isDark
    }
});
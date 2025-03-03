import { defineStore } from 'pinia'
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
    const user = ref({
        id: null,
        name: '',
        email: '',
        password: '',
    });
    const isAuthenticated = ref(false);



    const registerUser = (userData) => {
        console.log(`🔥登録用の受けたデータ:${JSON.stringify(userData, null, 2)}`);
        user.value = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        };
    };



    const setUser = () => {
        isAuthenticated.value = true;
    };



    const clearUser = () => {
        user.value = { id: null, name: '', email: '', password: '' };
        isAuthenticated.value = false;
    }



    const loginUser = (userData) => {
        console.log(`🔥ログイン用の受けたデータ:${JSON.stringify(userData, null, 2)}`);
        user.value = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        };
        setUser();
    };



    const logoutUser = () => {
        clearUser();
    };



    return {
        user,
        isAuthenticated,
        registerUser,
        setUser,
        clearUser,
        loginUser,
        logoutUser,
    };
});
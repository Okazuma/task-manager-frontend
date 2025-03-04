import { defineStore } from 'pinia'
import { ref } from "vue"
import api from "@/api";

export const useUserStore = defineStore('user', () => {
    const user = ref({
        id: null,
        name: '',
        email: '',
        password: '',
    });
    const isAuthenticated = ref(false);



    const registerUser = async (userData) => {
        try {
            const response = await api.post('/register',userData);
            console.log(`🔥登録用の受けたデータ:${JSON.stringify(userData, null, 2)}`);
            alert('ユーザー登録が成功しました');
            return response;
        } catch (error) {
            console.error('❌registerUser:ユーザー登録失敗:', error);
            console.log('📌 サーバーからのレスポンス:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'ユーザー登録に失敗しました。';
            alert(errorMessage);
            throw error;
        };
    };



    const setUser = (userData) => {
        isAuthenticated.value = true;
        user.value = userData;
    };



    const clearUser = () => {
        user.value = { id: null, name: '', email: '', password: '' };
        isAuthenticated.value = false;
    }



    const loginUser = async (userData) => {
        try {
            await api.get('/sanctum/csrf-cookie');

            const response = await api.post('/login', userData);
            console.log('📌 サーバーからのレスポンス:', response?.data);
            console.log(`🔥ログイン用の受けたデータ:${JSON.stringify(userData, null, 2)}`);

            setUser(response.data);

            return response;
        } catch (error) {
            console.log('❌loginUser:ログイン失敗:', error);
            console.log('📌 サーバーからのレスポンス:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'ログインに失敗しました。';
            alert(errorMessage);
            throw error;
        }
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
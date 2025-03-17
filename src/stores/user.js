import { defineStore } from 'pinia';
import { useTaskStore } from '../stores/task';
import { ref } from 'vue';
import api from '../api';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: null,
    name: '',
    email: '',
    password: '',
  });
  const isAuthenticated = ref(false);
  const isOpen = ref(false);
  const editingUser = ref({
    id: null,
    name: '',
    email: '',
    password: '',
  });
  const isPasswordChange = ref(false);
  const taskStore = useTaskStore();

  const fetchUser = async () => {
    try {
      const response = await api.get('/user');
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('❌fetchUser:ユーザー情報取得失敗', error);
      setUser({ id: null, name: '', email: '', password: '' });
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      alert('ユーザー登録が成功しました');
      return response;
    } catch (error) {
      console.error('❌registerUser:ユーザー登録失敗:', error);
      const errorMessage = error.response?.data?.message || 'ユーザー登録に失敗しました。';
      alert(errorMessage);
      throw error;
    }
  };

  const setUser = (userData) => {
    isAuthenticated.value = true;
    user.value = userData;
  };

  const clearUser = () => {
    user.value = { id: null, name: '', email: '', password: '' };
    isAuthenticated.value = false;
  };

  const loginUser = async (userData) => {
    try {
      await api.get('/sanctum/csrf-cookie');

      const response = await api.post('/login', userData);

      setUser(response.data);

      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'ログインに失敗しました。';
      alert(errorMessage);
      throw error;
    }
  };

  const openModal = () => {
    if (!user.value) return;
    editingUser.value = {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password,
    };
    isOpen.value = true;
  };

  const closeModal = () => {
    editingUser.value = {
      id: null,
      name: '',
      email: '',
      password: '',
    };
    isOpen.value = false;
  };

  const logoutUser = async () => {
    try {
      await api.post('/logout');
      clearUser();
      taskStore.clearTasks();
    } catch (error) {
      console.error('❌logoutUser:ログアウト失敗', error);
    }
  };

  const updateUser = async () => {
    if (!confirm('ユーザー情報を更新しますか？')) {
      return;
    }
    const newUser = {
      name: editingUser.value.name,
      email: editingUser.value.email,
    };
    if (isPasswordChange.value && editingUser.value.password) {
      newUser.password = editingUser.value.password;
    }
    try {
      const response = await api.put('/user', newUser);

      setUser({
        id: user.value.id,
        name: response.data.name,
        email: response.data.email,
      });
      alert('プロフィールが更新されました！');
      isOpen.value = false;
      closeModal();
    } catch (error) {
      console.error('❌updateProfile:プロフィール更新失敗', error);
      alert('プロフィール更新に失敗しました。');
    }
  };

  const deleteUser = async () => {
    if (!user.value) return;
    try {
      await api.delete('/user/');
      user.value = {
        id: null,
        name: '',
        email: '',
        password: '',
      };
      alert('🔥ユーザーが削除されました');
    } catch (error) {
      console.error('❌deleteUser:ユーザー削除の失敗:', error);
      alert('❌ユーザー削除に失敗しました');
    }
  };

  return {
    user,
    isAuthenticated,
    isOpen,
    editingUser,
    fetchUser,
    registerUser,
    setUser,
    clearUser,
    loginUser,
    openModal,
    closeModal,
    logoutUser,
    updateUser,
    deleteUser,
    isPasswordChange,
  };
});

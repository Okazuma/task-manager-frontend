import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    user: null,  // 初期値をnullに変更
    tasks: [],
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      console.log('Setting user:', user); //ユーザー情報を保存
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setTasks(state, tasks) {
      state.tasks = tasks; // タスク情報を保存
    },
    clearTasks(state) {
      state.tasks = [];
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          commit('clearUser'); // トークンがなければログアウト状態
          return;
        }

        const response = await axios.get('http://localhost/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        commit('setUser', response.data); // ユーザー情報をVuexに保存
      } catch (error) {
        console.error('Error fetching user:', error);
        commit('clearUser'); // エラーがあればユーザー情報をクリア
      }
    },
    async fetchTasks({ commit }) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        commit('setTasks', response.data); // タスク情報をVuexに保存
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');  // トークンを削除
      commit('clearUser');  // ユーザー情報をクリア
    },
  },
  modules: {},
});

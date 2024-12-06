import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    user: {},  // 初期値をnullに変更
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      console.log('Setting user:', user); 
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    }
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
    logout({ commit }) {
      localStorage.removeItem('token');  // トークンを削除
      commit('clearUser');  // ユーザー情報をクリア
    },
  },
  modules: {},
});

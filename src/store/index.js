import { createStore } from 'vuex'
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default createStore({
  state: {
    user: null,
    tasks: [],
  },
  getters: {
    user: (state) => state.user,
    tasks: (state) => state.tasks,
  },
  mutations: {
    setUser(state, user) {
      console.log('Setting user:', user);
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
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
          commit('clearUser');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        commit('clearUser');
      }
    },
    async fetchTasks({ commit }) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${API_BASE_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        commit('setTasks', response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('clearUser');
    },
  },
  modules: {},
});

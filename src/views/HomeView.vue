<template>

  <section class="home__section">

    <h2 class="page__title">Today</h2>

    <p v-if="!user">Guest</p>
    <p v-else>{{ user.name }}</p>

    <div v-if="todayTask.length === 0">
      <p>No tasks for today.</p>
    </div>

    <div v-for="task in todayTask" :key="task.id" class="task__group">
      <label class="task__label">Task name</label>
      <span class="task__item">{{ task.name }}</span>
    </div>
    <div v-for="task in todayTask" :key="'deadline-' + task.id"   class="task__group">
      <label class="task__label">Deadline</label>
      <span class="task__item">{{task.deadline}}</span>
    </div>
    <div v-for="task in todayTask" :key="'detail-' + task.id"   class="task__group">
      <label class="task__label">Task detail</label>
      <span class="task__item">{{task.detail}}</span>
    </div>

    <nav class="task__actions">
      <router-link to="/add-task" class="task__button">AddTask</router-link>
      <router-link to="/task-list" class="task__button">TaskList</router-link>

      <button @click="logout">Logout</button>

    </nav>

  </section>

</template>

<script>
export default {
  name: 'HomeView',
  computed: {
    user() {
      return this.$store.state.user;   // Vuexストアからユーザー情報を取得
    },
    tasks() {
      console.log(this.$store.state.tasks);  // デバッグ用
      return this.$store.state.tasks; // Vuexストアからタスク情報を取得
    },
    todayTask() {
      const today =  new Date().toLocaleDateString('en-CA'); // ローカルタイムのyyyy-mm-ddフォーマット
      console.log('Today:', today); // デバッグ用に本日の日付を表示
      return this.tasks.filter(task => task.deadline && task.deadline === today);
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');// ローカルストレージからトークンを削除
      this.$store.commit('clearUser');// Vuex のユーザー情報をクリア
      this.$store.commit('clearTasks');// Vuex のタスク情報をクリア
      this.$router.push('/login');// ログインページにリダイレクト
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.dispatch('fetchUser')// ユーザー情報を取得
        .then(() => {
          this.$store.dispatch('fetchTasks');// タスクも取得
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
          this.$router.push('/login');
        });
    } else {
      console.log('User not logged in.Redirecting to login page...');
      this.$router.push('/login');
    }
  },
};

</script>


<style scoped>

.home__section {
  width: 90%;
  height: auto;
  margin: 0 auto;
}

.page__title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

.user__name{
  color:grey;
  font-size: 16px;
}

.task__group {
  width: 100%;
  margin: 8px auto 16px;
}

.task__label {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  display: block;
}

.task__item {
  display: block;
}

.task__actions {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 80px auto;
}

.task__button {
  display: block;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  padding:4px;
  color: black;
  background-color: lightsteelblue;
  width: 160px;
  display: block;
  border: none;
  border-radius: 3px;
}



@media (min-width: 600px) {
  .task__button:hover {
      color: #fff;
      background: lightslategray;
    }
}

@media (min-width: 768px) {
}

</style>
<template>

  <section class="home__section">

    <h2 class="page__title">Today</h2>

    <div v-if="todayTask.length === 0">
      <p>No tasks for today.</p>
    </div>

    <div v-for="task in todayTask" :key="task.id" class="task__group">
      <p>No Tasks For Today</p>
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
    </nav>

  </section>

</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      tasks: [],
    };
  },
  computed: {
    todayTask() {
      const today = new Date().toISOString().split('T')[0];
      return this.tasks.filter(task => task.deadline && task.deadline === today);
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch('http://localhost/api/tasks');
        if (!response.ok) {
          throw new Error('タスクの取得に失敗しました');
        }
        const data = await response.json();
        this.tasks = data;
      } catch (error) {
        console.error('タスク取得エラー:', error);
      }
    },
  },
  mounted() {
    this.fetchTasks();
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
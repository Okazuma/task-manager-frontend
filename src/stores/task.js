import { defineStore } from 'pinia';
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import api from '../api';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([]);
  const isOpen = ref(false);
  const editingTask = ref({
    id: null,
    name: '',
    detail: '',
    category_id: 1,
    deadline: '',
  });
  const userStore = useUserStore();

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('❌タスクの取得失敗', error);
    }
  };

  const setTasks = (tasksData) => {
    if (!tasksData) return;
    tasks.value = tasksData;
  };

  const clearTasks = () => {
    tasks.value = [];
  };

  const createTask = async (newTask) => {
    if (!newTask) return;
    try {
      const response = await api.post('/tasks', newTask);
      tasks.value.push(response.data.task);
    } catch (error) {
      console.error('❌createTask:タスク追加失敗:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
    } catch (error) {
      console.error('❌deleteTask:タスク削除の失敗', error);
      alert('タスクの削除に失敗しました');
    }
  };

  const openModal = (task) => {
    if (!task) return;
    editingTask.value = { ...task };
    isOpen.value = true;
  };

  const closeModal = () => {
    editingTask.value = {};
    isOpen.value = false;
  };

  const updateTask = async () => {
    if (!confirm('ユーザー情報を更新しますか？')) {
      return;
    }
    if (!editingTask.value.id) {
      return;
    }
    try {
      const response = await api.put(`/tasks/${editingTask.value.id}`, {
        name: editingTask.value.name,
        detail: editingTask.value.detail,
        category_id: editingTask.value.category_id,
        deadline: editingTask.value.deadline,
        user_id: userStore.user.id,
      });
      tasks.value = tasks.value.map((task) =>
        task.id === editingTask.value.id ? { ...response.data.task } : task,
      );
      alert('タスクが更新されました');
      closeModal();
    } catch (error) {
      console.error('❌updateTask:タスク更新の失敗', error);
      alert('タスクの更新に失敗しました');
    }
  };

  return {
    tasks,
    editingTask,
    isOpen,
    fetchTasks,
    setTasks,
    clearTasks,
    createTask,
    deleteTask,
    openModal,
    closeModal,
    updateTask,
  };
});

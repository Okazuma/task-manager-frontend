import { defineStore } from "pinia";
import { ref } from "vue";
import  api  from "../api";


export const useTaskStore = defineStore('task', () => {
    const tasks = ref([]);
    const isOpen = ref(false);
    const editingTask = ref({
        id: null,
        name: '',
        detail: '',
        deadline: '',
    });


    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            console.log('📌タスク取得のサーバーからのレスポンス', response.data);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('❌タスクの取得失敗', error);
        }
    };



    const setTasks = (tasksData) => {
        if (!tasksData) return;
        tasks.value = tasksData;
        console.log('🔥セットしたタスク', tasks.value);
    };



    const clearTasks = () => {
        tasks.value = [];
        console.log('タスクをクリアしました');
    };



    const createTask = async (newTask) => {
        if (!newTask) return;
        console.log('🔥createTaskが受け取ったnewTask:', newTask);
        try {
            const response = await api.post('/tasks', newTask);
            console.log('📌タスク作成のサーバーレスポンス:', response.data);
            tasks.value.push(response.data.task);
            console.log('🔥taskValue push:',tasks);

            console.log(`🔥作成したtask:${JSON.stringify(newTask, null, 2)}`);
        } catch (error) {
            console.log('❌createTask:タスク追加失敗:', error);
            console.log('📌 タスク作成のサーバーレスポンス:', error.response?.data);
        }
    };



    const deleteTask = (taskId) => {
        tasks.value = tasks.value.filter(task => task.id !== taskId);
        console.log(`🔥削除したtask:${JSON.stringify(taskId, null , 2)}`);
    };



    const openModal = (task) => {
        console.log(`🔥モーダルが受け取ったtask:${JSON.stringify(task, null, 2) }`);
        if (!task) return;
        editingTask.value = { ...task };
        console.log(`🔥編集用にコピーしたeditingTask: ${JSON.stringify(editingTask.value, null, 2)}`);
        isOpen.value = true;
    };



    const closeModal = () => {
        editingTask.value = {};
        isOpen.value = false;
    };



    const updateTask = () => {
        if (!editingTask.value.id) {
            return;
        }
        tasks.value = tasks.value.map(task => task.id === editingTask.value.id ? { ...editingTask.value } : task);
        console.log(`🔥編集して更新されたtasks:${JSON.stringify(tasks.value, null, 2)}`);
        closeModal();
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
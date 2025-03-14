import { defineStore } from "pinia";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import  api  from "../api";


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
            console.log('📌タスク取得のサーバーからのレスポンス', response.data);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('❌タスクの取得失敗', error);
            if (error.response) {
                console.log('エラー時のレスポンス',error.response.date);
            }
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



    const deleteTask = async (taskId) => {
        try {
            const response = await api.delete(`/tasks/${taskId}`)
            console.log('📌タスク削除のサーバーレスポンス:', response.data);
            tasks.value = tasks.value.filter(task => task.id !== taskId);
            console.log('🔥削除して更新されたtasks:',tasks);
        } catch (error) {
            console.error('❌deleteTask:タスク削除の失敗', error);
            alert('タスクの削除に失敗しました');
        }
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
            console.log('📌updateTask:サーバーレスポンス:',response.data);
            tasks.value = tasks.value.map(task => task.id === editingTask.value.id ? { ...response.data.task } : task);
            console.log(`🔥編集して更新されたtasks:${JSON.stringify(tasks.value, null, 2)}`);
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
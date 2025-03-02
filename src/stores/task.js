import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useTaskStore = defineStore('task', () => {
    const tasks = ref([]);
    const isOpen = ref(false);
    const editingTask = ref({
        id: null,
        name: '',
        detail: '',
        deadline: '',
    });



    const createTask = (newTask) => {
        tasks.value.push(newTask);
        console.log(`🔥作成したtask:${JSON.stringify(newTask , null ,2)}`);
    };

    const deleteTask = (taskId) => {
        tasks.value = tasks.value.filter(task => task.id !== taskId)
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
        createTask,
        deleteTask,
        openModal,
        closeModal,
        updateTask,
    };
});
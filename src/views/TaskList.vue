<template>

    <section class="task__section">

        <h2 class="page__title">TaskList</h2>

        <SearchForm />

        <ul class="task__list">
            <li class="task__item" v-for="task in tasks" :key="task.id">
                <div class="task__content">
                    <span class="task__name">{{ task.name }}</span>
                </div>
                <div class="task__actions">
                    <button type="button" class="task__button" @click="openEditModal(task)">Edit</button>
                    <button type="button" class="task__button">Delete</button>
                </div>
            </li>
        </ul>

        <EditModal
        v-if="isModalOpen"
        :task="selectedTask"
        @close="isModalOpen = false"
        @update="updateTask"
        />

    </section>

</template>

<script>
import SearchForm from '@/components/SearchForm.vue';
import EditModal from '@/components/EditModal.vue';

export default {
    name: 'TaskList',
    components: {
        SearchForm,
        EditModal,
    },
    data() {
        return {
            tasks: [
            ],
            isModalOpen: false,
            selectedTask: null,
        };
    },
    mounted() {
        this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            try {
                const response = await fetch('http://localhost/api/tasks');
                const data = await response.json();
                this.tasks = data;
            } catch (error) {
                console.error('タスク取得エラー:', error);
            }
        },
        // 編集モーダルを開くーーーーー
        openEditModal(task) {
            this.selectedTask = { ...task };
            this.isModalOpen = true;
        },
        // モーダルが閉じられたときに呼ばれるーーーーー
        closeModal() {
            this.isModalOpen = false;
            this.selectedTask = null;
        },
        // タスクを更新ーーーーー
        updateTask(updatedTask) {
            console.log("Updating task:", updatedTask);
            const index = this.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                // 配列の要素を直接更新
                this.tasks[index] = updatedTask;
            }
            this.isModalOpen = false;
        },
    },
};
</script>


<style scoped>

.task__section{
    width: 90%;
    height: auto;
    margin: 0 auto;
    text-align: center;
}

.page__title{
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
}

.task__list{
    width: 100%;
    margin: 0 auto;
    padding-left: 0;
}

.task__item{
    display: flex;
    justify-content: space-between;
    padding: 8px;
}

.task__name{
    font-size: 16px;
    font-weight: 700;
}

.task__actions{
    display: flex;
    gap: 8px;
}

.task__button {
    font-size: 10px;
    font-weight: 500;
    color: black;
    background-color: lightsteelblue;
    width: 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}



@media (min-width: 600px) {
    .task__button:hover {
        color: #fff;
        background-color: lightslategray;
    }
}

@media (min-width: 768px) {
}

</style>
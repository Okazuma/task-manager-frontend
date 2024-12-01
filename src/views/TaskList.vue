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
        :isOpen="isModalOpen"
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
                { id: 1, name: 'Task 1', deadline: '2024-12-01', detail: 'Details for Task 1' },
                { id: 2, name: 'Task 2', deadline: '2024-12-02', detail: 'Details for Task 2' },
            ],
            isModalOpen: false,
            selectedTask: null,
        };
    },
    methods: {
        openEditModal(task) {
            this.selectedTask = { ...task };
            this.isModalOpen = true;
        },
        updateTask(updatedTask) {
            console.log("Updating task:", updatedTask);
            const index = this.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                // 配列の要素を直接更新
                this.tasks[index] = updatedTask;
            }
            this.isModalOpen = false;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedTask = null;
        }
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
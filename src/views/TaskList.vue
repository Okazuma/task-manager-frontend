<template>
    <section class="task__section">
        <h2 class="page__title">TaskList</h2>

        <SearchForm  @update-search="setSearchQuery"/>

        <ul class="task__list">
            <li class="task__item" v-for="task in filteredTasks" :key="task.id">
                <div class="task__content">
                    <span class="task__name">{{ task.name }}</span>
                </div>
                <div class="task__actions">
                    <button type="button" class="task__button" @click="openEditModal(task)">Edit</button>
                    <button @click="handleDelete(task.id)" type="button" class="task__button">Delete</button>
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

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
    name: 'TaskList',
    components: {
        SearchForm,
        EditModal,
    },
    data() {
        return {
            isModalOpen: false,
            selectedTask: null,
            searchQuery: '',
        };
    },
    computed: {
        tasks() {
            return this.$store.state.tasks;
        },
        filteredTasks() {
            if (!this.searchQuery) return this.tasks;
            return this.tasks.filter(task =>
                task.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    mounted() {
    if (this.$store.state.user) {
            this.$store.dispatch('fetchTasks');
        } else {
            console.error('User is not authenticated.');
            this.$router.push('/login');
        }
    },
    methods: {
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
        // タスクの検索
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        // タスクを更新ーーーーー
        updateTask(updatedTask) {
            console.log("Updating task:", updatedTask);
            const index = this.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }
            this.isModalOpen = false;
        },
        // タスク削除の処理ーーーーー
        async handleDelete(taskId) {
            const confirmDelete = confirm("本当に削除しますか？");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if(!response.ok){
                    throw new Error("削除に失敗しました");
                }

                await this.$store.dispatch('fetchTasks');
                this.$store.commit('setTasks', this.tasks);
                alert("タスクを削除しました");
            }catch (error) {
                console.error(error);
                alert("タスクの削除に失敗しました");
            }
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
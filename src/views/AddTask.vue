<template>
    <section class="add__form">
        <h2 class="page__title">Add Task</h2>

        <form @submit.prevent="addTask">

            <div class="form__group">
                <label for="name" class="form__label">Task name</label>
                <input v-model="taskName" type="text" id="name" name="name" class="form__input" placeholder="Task name">
            </div>

            <div class="form__group">
                <label for="detail" class="form__label">Task detail</label>
                <textarea v-model="taskDetail" type="text" id="detail" name="detail" class="form__textarea" placeholder="Task detail"></textarea>
            </div>

            <div class="form__group">
                <label for="deadline" class="form__label">Deadline</label>
                <input v-model="taskDeadline" type="date" id="deadline" name="deadline" class="form__input" placeholder="Task Deadline">
            </div>

            <button type="submit" class="form__button">Add</button>

        </form>
    </section>
</template>


<script>
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
    name: 'addTask',
    data() {
        return {
            taskName: "",
            taskDeadline: "",
            taskDetail: "",
        };
    },
    computed: {
        userId() {
            return this.$store.state.user ? this.$store.state.user.id : null;
        }
    },
    methods: {
        async addTask() {
            if (!this.taskName || !this.taskDeadline || !this.taskDetail) {
                alert("Fill all forms");
                return;
            }

            if (!this.userId) {
            alert("ユーザー情報が取得できませんでした。再ログインしてください。");
            return;
}

            const taskData = {
                name: this.taskName,
                detail: this.taskDetail,
                deadline: this.taskDeadline,
                user_id: this.userId,
            };

            try {
                const response = await fetch(`${API_BASE_URL}/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(taskData),
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('タスクの追加に失敗しました');
                }

                const data = await response.json();
                console.log('タスク追加成功:', data);
                this.$router.push({ name: 'TaskList' });
            } catch (error) {
                console.error('エラー:', error);
                alert('タスクの追加中にエラーが発生しました');
            }
        },

        resetForm() {
            this.taskName = "";
            this.taskDetail = "";
            this.taskDeadline = "";
        },
    },
    mounted() {
    if (localStorage.getItem('token')) {
        this.$store.dispatch('fetchUser');
    }
  },
};
</script>


<style scoped>
.add__form {
    width: 90%;
    height: auto;
    margin: 0 auto;
}

.page__title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
}

.form__group {
    width: 100%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
}

.form__label {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4px;
}

.form__input {
    font-size: 16px;
    width: 320px;
    margin: 0 auto;
    outline: none;
    text-align: center;
}

.form__textarea{
    font-size: 16px;
    width: 320px;
    height: 120px;
    margin: 0 auto;
    outline: none;
}

.form__button {
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    font-weight: 700;
    color: black;
    display: block;
    background-color: lightsteelblue;
    width: 160px;
    margin: 40px auto;
    padding: 4px;
    border: none;
    border-radius: 3px;
}



@media (min-width: 600px) {
    .form__button:hover {
        color: #fff;
        background: lightslategray;
    }
}

@media (min-width: 768px) {
}
</style>
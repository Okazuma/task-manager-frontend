<template>
    <section class="modal__form" :class="{ 'modal__form--active': isOpen }" >

        <h2 class="page__title">EditTask</h2>

        <form @submit.prevent="submitForm">

            <div class="form__group">
                <label for="name" class="form__label">Task name</label>
                <input type="text" id="name" class="form__input" v-model="localTask.name">
            </div>
            <div class="form__group">
                <label for="deadline" class="form__label">Deadline</label>
                <input type="date" id="deadline" class="form__input" v-model="localTask.deadline">
            </div>

            <div class="form__group">
                <label for="detail" class="form__label">Task detail</label>
                <textarea id="detail" name="detail" class="form__textarea" v-model="localTask.detail">Task detail</textarea>
            </div>

            <button type="submit" class="form__button">Save</button>
            <button type="button" class="close__button" @click="closeModal">Close</button>

        </form>

    </section>
</template>

<script>
import axios from 'axios';

export default {
    name:'EditModal',
    props: {
    task: {
        type: Object,
        required: true,
        }
    },

    data() {
        return {
            // 親コンポーネントから渡された task をコピーして localTask として管理
            localTask: { ...this.task },// 深いコピーを使って、task の変更が親コンポーネントに影響しないように
        };
    },
    watch: {
        task(newTask) {
            // 親から渡された新しいtaskをlocalTaskにコピー
            this.localTask = { ...newTask };
        }
    },
    methods: {
        async submitForm() {
            try {
                // サーバーに更新リクエストを送る
                const response = await axios.put(`http://localhost/api/tasks/${this.localTask.id}`, this.localTask);
                console.log('更新成功:', response.data);

                // 親コンポーネントに更新されたタスクを通知
                this.$emit('update', response.data);

                // モーダルを閉じる
                this.closeModal();
            } catch (error) {
                console.error('更新エラー:', error);
            }
        },
        closeModal() {
            this.$emit('close');
        },
    },
};

</script>

<style scoped>

.modal__form {
    width: 80%;
    height: auto;
    margin: 0 auto;
    color: #3e3e3e;
    background:lightgrey;
    padding: 20px;
    border: 4px solid grey;
    border-radius: 4px;
}

.modal__form--active {
    opacity: 1;
    transform: translate(0%, -50%) scale(1);
}

.page__title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
}

.form__group {
    width: 100%;
    margin: 8px auto 16px;
}

.form__label {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
    display: block;
}

.form__input {
    font-size: 16px;
    width: 240px;
    margin: 0 auto;
    outline: none;
    text-align: center;
}

.form__textarea{
    font-size: 16px;
    width: 240px;
    height: 120px;
    margin: 0 auto;
    outline: none;
}

.form__button {
    display: block;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    font-weight: 700;
    padding: 4px;
    margin: 20px auto;
    color: black;
    background-color: lightsteelblue;
    width: 160px;
    display: block;
    border: none;
    border-radius: 4px;
}

.close__button{
    color:#3e3e3e;
    font-weight: 700;
    background:grey;
    display: block;
    position: right;
    margin: 20px auto;
    width: 80px;
    padding: 4px;
    border-radius: 4px;
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
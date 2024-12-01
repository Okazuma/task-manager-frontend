<template>
    <section class="modal__form" v-if="isOpen" :class="{ 'modal__form--active': isOpen }" >

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
export default {
    props: {
        isOpen: Boolean,
        tasks: Array,
    },
    data() {
        return {
            // taskのコピーをdataに格納
            localTask: { ...this.task },
        };
    },
    watch: {
        task(newTask) {
            this.localTask = { ...newTask };
        }
    },
    methods: {
        submitForm() {
            this.$emit('update', this.localTask);
            this.closeModal();
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
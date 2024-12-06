<template>

    <section class="register__form">

        <h2 class="page__title">Register</h2>

        <form @submit.prevent="register">
            <div class="form__group">
                <label for="name" class="form__label">Name</label>
                <input type="text" id="name" name="name" class="form__input" v-model="name">
            </div>

            <div class="form__group">
                <label for="email" class="form__label">Email</label>
                <input type="text" id="email" name="email" class="form__input" v-model="email">
            </div>

            <div class="form__group">
                <label for="password" class="form__label">Password</label>
                <input type="password" id="password" name="password" class="form__input" v-model="password">
            </div>

            <button type="submit" class="form__button">Register</button>

        </form>

    </section>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async register() {
            try {
                // CSRFトークンを取得
                await axios.get('http://localhost/sanctum/csrf-cookie');
                // ユーザー登録リクエスト
                const response = await axios.post('http://localhost/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                console.log('User registered successfully', response.data);
                this.$router.push('/login');
            } catch (error) {
                this.errorMessage = 'ユーザー登録に失敗しました';
                if (error.response && error.response.data.errors) {
                    this.errorMessage = error.response.data.error - Object.keys(error.response.data.errors)[0][0];
                }
            }
        },
    },
};

</script>


<style scoped>

.register__form {
    width: 90%;
    height: auto;
    margin: 0 auto;
}

.page__title{
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
}

.form__group{
    width: 100%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
}

.form__label{
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4px;
}

.form__input{
    font-size: 16px;
    width: 240px;
    margin: 0 auto;
    outline: none;
}

.form__button{
    font-size: 16px;
    font-weight: 700;
    color: black;
    display: block;
    background-color: lightsteelblue;
    width: 160px;
    margin: 80px auto;
    padding:4px;
    border:1px solid grey;
    border: none;
    border-radius: 3px;
    text-align: center;
}



@media (min-width: 600px) {
    .form__button:hover {
        color: #fff;
        background-color: lightslategray;
    }
}

@media (min-width: 768px) {
}

</style>
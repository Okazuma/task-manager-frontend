<template>
    <section class="login__form">
        <h2 class="page__title">Login</h2>

        <form @submit.prevent="login">
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

            <button type="submit" class="form__button">Login</button>

        </form>
    </section>
</template>


<script>
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
    data() {
        return {
            name:"",
            email: "",
            password: "",
            errorMessage: "",
        };
    },
    computed: {
        user() {
            const user = this.$store.state.user;
            console.log('User from Vuex store:', user);
            return user;
        },
    },
    methods: {
        async login() {
            try {
                await axios.get('http://localhost/sanctum/csrf-cookie');
                const response = await axios.post(`${API_BASE_URL}/login`, {
                    email: this.email,
                    password: this.password,
                });

                localStorage.setItem('token', response.data.token);

                await this.$store.dispatch('fetchUser');

                this.$router.push('/');
            } catch (error) {
                console.error('Login error:', error);
                this.errorMessage = 'ログインに失敗しました';
            }
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
.login__form {
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
    width: 240px;
    margin: 0 auto;
    outline: none;
}

.form__button {
    font-size: 16px;
    font-weight: 700;
    color: black;
    display: block;
    background-color: lightsteelblue;
    width: 160px;
    margin: 80px auto;
    padding: 4px;
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
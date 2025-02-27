<template>
    <section class="edit__form">
        <h2 class="page__title">EditProfile</h2>

        <form @submit.prevent="updateProfile" class="form__content">
            <div class="form__group">
                <label for="name" class="form__label">Name</label>
                <input type="text" id="name" name="name" class="form__input" v-model="updateUser.name">
            </div>

            <div class="form__group">
                <label for="email" class="form__label">Email</label>
                <input type="text" id="email" name="email" class="form__input" v-model="updateUser.email">
            </div>

            <div class="form__group">
                <label for="password" class="form__label">Password</label>
                <input type="password" id="password" name="password" class="form__input" v-model="updateUser.password">
            </div>

            <button type="submit" class="form__button">Finish</button>

        </form>
    </section>
</template>


<script>
import axios from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
    computed: {
        userFromStore() {
        return this.$store.state.user|| {};
        },
    },
    data() {
        return {
            updateUser: {
                name: '',
                email: '',
                password: '',
            },
        };
    },
    mounted() {
        if (this.userFromStore) {
        this.updateUser.name = this.userFromStore.name || '';
        this.updateUser.email = this.userFromStore.email || '';
        }else {
        console.error('User information not available');
        this.$router.push('/login');
        }
    },
    watch: {
        userFromStore(newUser) {
        this.updateUser.name = newUser.name || '';
        this.updateUser.email = newUser.email || '';
        },
    },
    methods: {
        async updateProfile() {
            try {
                const formData = {
                    name: this.updateUser.name,
                    email: this.updateUser.email,
                };
                if (this.updateUser.password) {
                    formData.password = this.updateUser.password;
                }

                await axios.put(`${API_BASE_URL}/user`, formData);
                alert('Profile updated successfully!');
                this.$router.push('/');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        },
    },
};
</script>


<style scoped>
.edit__form {
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
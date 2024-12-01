<template>
    <header>
        <h1>Task Manager</h1>
        <nav>
            <router-link to="/" class="nav__button">Home</router-link>
            <router-link to="/user-register" class="nav__button">Register</router-link>
            <router-link to="/user-login" class="nav__button">Login</router-link>
            <router-link to="/user-edit" class="nav__button">EditProfile</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'TheHeader'
}
</script>

<style scoped>
header {
    background-color: #3e3e3e;
    color: white;
    padding: 10px;
    text-align: center;
}

nav a {
    margin: 0 10px;
    text-decoration: none;
    color: white;
}

.router-link-active {
    color: orange;
}



@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

</style>

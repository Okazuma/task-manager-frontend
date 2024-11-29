<template>
    <header>
        <h1>Task Manager</h1>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/user-register">Register</router-link>
            <router-link to="/user-login">Login</router-link>
            <router-link to="/user-edit">EditProfile</router-link>
            <router-link to="/add-task">AddTask</router-link>
            <router-link to="/task-list">TaskList</router-link>
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
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
}

nav a {
    margin: 0 10px;
    text-decoration: none;
    color: white;
}
</style>

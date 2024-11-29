<template>

    <div>
        <input type="text" v-model="searchQuery" placeholder="Search tasks..." />
        <button @click="searchTasks">Search</button>
    </div>

</template>

<script>
export default {
    name: 'SearchForm',
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        searchTasks() {
            console.log('Searching for:', this.searchQuery);
        }
    }
}
</script>

<style scoped>
input {
    padding: 5px;
    margin-right: 10px;
}

button {
    padding: 5px;
}
</style>

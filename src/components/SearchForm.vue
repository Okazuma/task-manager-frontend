<template>

    <div class="search-form">
        <input type="text" v-model="searchQuery" class="search-form__input" placeholder="Search tasks..." />
        <button @click="searchTasks" class="search-form__button">Search</button>
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

.search-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 24px 0;
}

.search-form__input {
    height: 40px;
    box-sizing: border-box;
    padding: 4px;
    font-size: 16px;
    width: 60%;
    max-width: 400px;
    border: 1px solid grey;
    height: 40px;
    border-radius: 4px;
    margin-right: 16px;
    outline: none;
}

.search-form__button {
    height: 40px;
    box-sizing: border-box;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    padding: 4px;
    width: 80px;
}

.search-form__button:hover {
    background-color: #0056b3;
}



@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

</style>
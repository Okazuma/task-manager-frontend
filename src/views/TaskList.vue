<template>

    <div>
        <h1>TaskList</h1>
        <SearchForm />
        <ul>
        </ul>
    </div>

</template>

<script>
import SearchForm from '@/components/SearchForm.vue';

export default {
    name: 'TaskList',
    components: {
        SearchForm
    }
}
</script>

<style>

</style>
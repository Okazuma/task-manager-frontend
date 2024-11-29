<template>

    <section class="task__section">

        <h2 class="page__title">TaskList</h2>

        <SearchForm />

        <ul class="task__list">
            <li class="task__item">
                <div class="task__content">
                    <span class="task__name">Test</span>
                </div>
                <div class="task__actions">
                    <button type="button" class="task__button">Edit</button>
                    <button type="button" class="task__button">Delete</button>
                </div>
            </li>

            <li class="task__item">
                <div class="task__content">
                    <span class="task__name">Test</span>
                </div>
                <div class="task__actions">
                    <button type="button" class="task__button">Edit</button>
                    <button type="button" class="task__button">Delete</button>
                </div>
            </li>
        </ul>

    </section>

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


<style scoped>

.task__section{
    width: 90%;
    height: auto;
    margin: 0 auto;
    text-align: center;
}

.page__title{
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
}

.task__list{
    width: 100%;
    margin: 0 auto;
    padding-left: 0;
}

.task__item{
    display: flex;
    justify-content: space-between;
    padding: 8px;
}

.task__name{
    font-size: 16px;
    font-weight: 700;
}

.task__actions{
    display: flex;
    gap: 8px;
}

.task__button {
    font-size: 16px;
    font-weight: 500;
    color: black;
    background-color: lightsteelblue;
    width: 56px;
    padding: 0 4px;
    border: 1px solid grey;
    border-radius: 3px;
    cursor: pointer;
}



@media (min-width: 600px) {
    .task__button:hover {
        color: #fff;
        background-color: lightslategray;
    }
}

@media (min-width: 768px) {
}

</style>
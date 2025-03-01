<template>
    <section v-show="taskStore.isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 sm:w-[500px] md:w-[600px] lg:w-[800px]">
            <h1 class="text-center text-xl mb-4">Task Edit</h1>
            <slot/>
        </div>
    </section>
</template>


<script setup>
import {useTaskStore} from "../stores/task";


const taskStore = useTaskStore();
</script>

<script setup>

import {state} from "@/io";

const {username, results, prompts} = defineProps(['results', 'username', 'prompts'])

</script>

<template>
    <div class="board-item-container card mb-3">
        <b class="card-header">{{ username }}</b>
        <div class="card-body">
            <div v-for="(prompt, index) in prompts" class="board-item" :key="index">
                <p>{{ prompt }}</p>
                <input type="text" :value="results[index]" disabled>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
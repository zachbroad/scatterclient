<script setup>

import {state} from "@/io";

const {username, results, prompts, answers} = defineProps(['answers', 'results', 'username', 'prompts'])

</script>

<template>
  <div class="board-item-container card mb-3">
    <p>Prompts: {{ prompts }}</p>
    <p>Results: {{ results }}</p>
    <p>Answers: {{ answers }}</p>
    <div class="card-header">
      <b class="card-title">{{ username }}</b>
    </div>
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
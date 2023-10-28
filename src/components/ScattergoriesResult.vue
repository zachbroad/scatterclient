<script setup>

import {state} from "@/io";

const {results} = defineProps(['results'])

</script>

<template>
  <div class="board-item-container">
    <div v-for="(prompt, index) in state.room.game.currentPrompts" class="board-item" :key="index">
      <p>{{ prompt }}</p>
      <input type="text" v-model="answers[index]" :disabled="!inProgress">
    </div>
  </div>
</template>

<style scoped>

</style>
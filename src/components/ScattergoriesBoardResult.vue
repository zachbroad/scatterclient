<script setup>

import {state} from "@/state";
import {computed} from "vue";

const {username, results, answers} = defineProps(["answers", "results", "username"]);

const score = computed(() => results.reduce((a, b) => a + b, 0));

</script>

<template>
  <div class="board-item-container card p-0 mb-3">
    <div class="card-header">
      <b>{{ username }} - <span class="float-end badge bg-success">score: {{ score }}</span></b>
    </div>

    <!-- TODO: Make this a component -->
    <div class="card-body">
      <div v-for="(prompt, index) in state.room.game.currentPrompts" class="board-item" :key="index">
        <p>{{ prompt }}</p>
        <input class="form-control" type="text" :value="answers[index]" :class="[results[index] ? 'correct' : 'incorrect']" disabled>
      </div>
    </div>
  </div>
</template>

<style scoped>
.incorrect {
  border: 1px solid red !important;
}

.correct {
  border: 1px solid green !important;
}
</style>
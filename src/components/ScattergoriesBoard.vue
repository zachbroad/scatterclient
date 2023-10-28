<script setup>

import {computed, onMounted, reactive, ref, watchEffect} from "vue";
import {socket, state} from "@/io";

const letter = ref("A")
const timer = ref(60)

// Messages w/ initial state
const answers = reactive([]);
for (let i = 0; i < 20; i++) {
  answers.push('');
}


let interval = null;

function startTimer() {
  interval = setInterval(() => {
    timer.value -= 1;
  }, 1000)
}

watchEffect(() => {
  if (timer.value <= 0) {
    console.log(`Time's up!`);
    clearInterval(interval);
  }
})

const inProgress = computed(() => timer.value > 0);

onMounted(() => {
  timer.value = state.room.game.roundDuration;
  startTimer();
});

socket.on('room:requestAnswers', () => {
  console.log('Server is requesting answers...');

  socket.emit('room:provideAnswers', {
    slug: state.room.slug,
    answers: answers
  });
  console.log('Send answers!');
})

</script>

<template>
  <div class="board">
    <h2>Game</h2>
    <p>Letter: {{ letter }}</p>
    <p>Time left: {{ timer }}</p>
    <hr>
    <div class="board-item-container">
      <div v-for="(prompt, index) in state.room.game.currentPrompts" class="board-item" :key="index">
        <p>{{ prompt }}</p>
        <input type="text" v-model="answers[index]" :disabled="!inProgress">
      </div>
    </div>
    <button class="btn btn-success">submit</button>
  </div>
</template>

<style scoped>


hr {
  margin: 0.5rem 0;
}

</style>
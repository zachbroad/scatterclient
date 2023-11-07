<script setup>
import ScattergoriesBoardPlayable from "@/components/ScattergoriesBoardPlayable.vue";
import {state} from "@/state";
import {computed, onMounted, ref, watchEffect} from "vue";
import Navbar from "@/components/Navbar.vue";

const letter = ref("");
const timer = ref(60);

// Timer countdown for round duration.
let interval = null;
function startTimer() {
  interval = setInterval(() => {
    timer.value -= 1;
  }, 1000);
}

const inProgress = computed(() => timer.value > 0);

onMounted(() => {
  letter.value = state.room.game.letter;
  timer.value = state.room.game.roundDuration;
  startTimer();
});

watchEffect(() => {
  if (timer.value <= 0) {
    console.log(`Time's up!`);
    clearInterval(interval);
  }
});

</script>

<template>
  <Navbar :center="`${timer} seconds`" :right="`Letter: <b>${state.room.game.letter}</b>`"/>

  <div class="container mt-4">
    <!-- Display the current letter -->
    <div class="letter-container">
      <b v-if="letter" class="shadow shadow-lg border border-dark"><span></span>{{ letter }}</b>
    </div>

    <!-- The board itself -->
    <ScattergoriesBoardPlayable :in-progress="inProgress"/>
  </div>
</template>

<style scoped>

.letter-container {
  text-align: center;
  margin: 2rem;

}

.letter-container b {
  font-size: 4rem;
  padding: 1rem;
  background-color: whitesmoke;
  border-radius: .35rem;
}

</style>
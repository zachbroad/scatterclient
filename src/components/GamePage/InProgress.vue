<script setup>
import ScattergoriesBoardPlayable from "@/components/ScattergoriesBoardPlayable.vue";
import {state} from "@/state";
import {computed, onMounted, ref, watchEffect} from "vue";
import Navbar from "@/components/Navbar.vue";

const letter = ref("");

onMounted(() => {
  letter.value = state.room.game.letter;
});
const timer = ref(60);
let interval = null;

function startTimer() {
  interval = setInterval(() => {
    timer.value -= 1;
  }, 1000);
}

const inProgress = computed(() => timer.value > 0);

watchEffect(() => {
  if (timer.value <= 0) {
    console.log(`Time's up!`);
    clearInterval(interval);
  }
});

onMounted(() => {
  timer.value = state.room.game.roundDuration;
  startTimer();
});
</script>

<template>
  <Navbar :center="`${timer} seconds`" :right="`Letter: <b>${state.room.game.letter}</b>`"/>

  <div class="container mt-4">
    <!--    <div class="letter-container">-->
    <!--      <b v-if="letter" class="shadow shadow-lg"><span></span>{{ letter }}</b>-->
    <!--    </div>-->
    <!--    <hr>-->
    <ScattergoriesBoardPlayable :in-progress="inProgress"/>
  </div>
</template>

<style scoped>

.letter-container {
  text-align: center;
  margin: 4rem;
}

.letter-container b {
  font-size: 4rem;
  padding: 1rem;
  background-color: whitesmoke;
  border-radius: .5rem;
}

</style>
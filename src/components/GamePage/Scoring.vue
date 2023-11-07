<script setup>

import {computed, onMounted, onUnmounted, ref} from "vue";

const time = ref(0); // For . .. ... animation
let interval = null;

onMounted(() => {
  let TIMER_INTERVAL = 750;

  interval = setInterval(() => {
    time.value = time.value + 1;
  }, TIMER_INTERVAL);
});

onUnmounted(() => {
  clearInterval(interval);
  interval = null;
});

let getWaitingText = computed(() => {
  const text = [
    "Please wait",
    "Please wait.",
    "Please wait..",
    "Please wait...",
  ];

  return text[time.value % text.length];
});

</script>

<template>
  <div class="container">
    <div class="d-flex text-center p-3 mb-3 align-items-center">
      <div class="p-5 bg-white shadow border border-black rounded mx-auto">
        <h1>Scoring game</h1>
        <p v-text="getWaitingText"></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
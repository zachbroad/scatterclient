<script setup>

import {onMounted, ref} from "vue";

const props = defineProps(["time", "letter"]);

const time = ref(10);

onMounted(() => {
  console.dir(props.time);
  time.value = props.time;
});

setInterval(() => {
  time.value = time.value - 1;
}, 1000);

</script>

<template>
  <!--  {{startingTime}}-->
  <div class="d-flex">
    <div class="countdown align-content-center justify-content-center align-items-center text-center">
      <b v-if="time > 0">{{ time }} seconds</b>
      <b v-if="time <= 0">game is starting...</b>
    </div>
  </div>
</template>

<style scoped>
b {
  font-size: 2rem;
}

.countdown {
  margin: auto;
  padding: 2rem;
  background-color: white;
  border-radius: 5rem;
}

</style>
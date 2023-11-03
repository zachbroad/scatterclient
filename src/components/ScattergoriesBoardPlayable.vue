<script setup>

import {computed, onMounted, reactive, ref, watchEffect} from "vue";
import {state} from "@/state";
import Countdown from "@/components/Countdown.vue";
import {socket} from "@/network/socket";

const letter = ref("A");

// Messages w/ initial state
const answers = reactive([]);
for (let i = 0; i < 20; i++) {
  answers.push("");
}

const {inProgress} = defineProps(["inProgress"]);


onMounted(() => {
  letter.value = state.room.game.letter;
});

socket.on("room:requestAnswers", () => {
  console.log("Server is requesting answers...");

  socket.emit("room:provideAnswers", {
    slug: state.room.slug,
    answers: answers
  });

  console.log("Sent answers!");
});

</script>

<template>
  <div class="board-item-container card p-0">
    <!--    <h2>Game</h2>-->
    <!--    <p>Time left: {{ timer }}</p>-->
    <!--    <Countdown :time="state.room.game.roundDuration" :letter="letter"/>-->
    <!--    <hr>-->
    <div class="card-body">
      <div v-for="(prompt, index) in state.room.game.currentPrompts" class="board-item" :key="index">
        <p>{{ prompt }}</p>
        <input class="form-control" type="text" v-model="answers[index]" :disabled="!inProgress">
      </div>
    </div>
  </div>
</template>

<style scoped>


hr {
  margin: 0.5rem 0;
}

</style>
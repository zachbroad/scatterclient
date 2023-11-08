<script setup>

import {onMounted, reactive, ref} from "vue";
import {state} from "@/state";
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

// Send answers to server when requested
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
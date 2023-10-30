<script setup>
import {socket, state} from "@/io";
import {reactive, ref, watchEffect} from "vue";
import ScattergoriesBoard from "@/components/ScattergoriesBoard.vue";
import {GameStatus} from "@/util";
import Countdown from "@/components/Countdown.vue";
import ScattergoriesResult from "@/components/ScattergoriesResult.vue";

const message = ref("");


watchEffect(() => {
})

// onUnmounted(() => {
//   socket.off('room:message')
// })

function sendRoomMessage() {
  if (message.value.trim() !== "") {
    socket.emit('room:message', {
      room: state.room.slug,
      message: message.value
    });
  }

  // Reset message value
  message.value = "";
}

function startGame() {
  socket.emit('room:startGame', {
    slug: state.room.slug
  })
}

socket.on('room:message', (message) => {
  console.log('Got message: ' + message);
  state.room.chat = state.room.chat.concat(message);
});

</script>

<template>
  <div v-if="state.room.status === GameStatus.Waiting">
    <div class="row">
      <div class="col-9 card card-body mb-3">
        <h5 class="fw-bold">{{ state.room.name }}</h5>
        <p>{{ state.room.slug }}</p>
        <p>{{ state.room.players.length }} / {{ state.room.capacity }}</p>
        <button class="btn btn-sm btn-danger mb-3">leave game</button>
      </div>
      <div class="col-3 card card-body mb-3">
        <h5>Player list</h5>
        <ul>
          <li v-for="player in state.room.players">{{ player.username }}</li>
        </ul>
      </div>
      <div class="card card-body mb-3">
        <h5>Chat</h5>
        <ul>
          <li v-for="chat in state.room.chat">{{ chat }}</li>
          <li v-if="state.room.chat.length === 0">no messages</li>
        </ul>
        <form @submit.prevent="sendRoomMessage" class="d-flex">
          <input class="form-control" type="text" v-model="message">
          <button class="btn btn-success" type="submit">send</button>
        </form>
      </div>
      <button class="btn btn-sm btn-success mt-3" @click="startGame">start game</button>
    </div>
  </div>
  <div v-else-if="state.room.status === GameStatus.Starting">
    <h1 class="text-center">GET READY!</h1>
    <Countdown :time="state.room.game.lobbyDuration"/>
  </div>
  <div v-else-if="state.room.status === GameStatus.InProgress">
    <ScattergoriesBoard/>
  </div>
  <div v-else-if="state.room.status === GameStatus.Scoring">
    <h1>Scoring game...</h1>
    <p>Please wait</p>
  </div>
  <div v-else-if="state.room.status === GameStatus.Results">
    <div class="d-flex my-4 flex-column">
      <div class="justify-content-center bg-white text-center py-4 rounded">
        <h1 class="">The results are in!</h1>
        <Countdown :time="state.room.game.resultsDuration"/>
        <p>Winner: N/A</p>
      </div>
    </div>

    <div class="row">
      <ScattergoriesResult
          v-for="(result, key) in state.room.game.results"
          class="col-sm-12 col-md-6 col-lg-4"
          :prompts="state.room.game.currentPrompts"
          :answers="result.answers"
          :results="result.results"
          :username="key"
      />
    </div>
  </div>
  <div v-else>
    no game
    {{ state }}
  </div>
</template>

<style scoped>

</style>
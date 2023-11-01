<script setup>

import {state} from "@/state";
import {ref} from "vue";
import {socket} from "@/network/socket";

function startGame() {
  socket.emit('room:startGame', {
    slug: state.room.slug
  });
}

socket.on('room:message', (message) => {
  console.log('Got message: ' + message);
  state.room.chat = state.room.chat.concat(message);
});

/* Room Messaging */
const message = ref("");

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


function leaveRoom() {
  socket.emit('room:leave', {
    room: state.room
  });
}

</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-content-stretch">
      <div class="col-sm-12 col-lg-5 mb-3 order-sm-first">
        <div class="bg-white card card-body rounded border-dark shadow-sm" style="height: 420px;">
          <h5>Chat</h5>
          <ul>
            <li v-for="chat in state.room.chat">{{ chat }}</li>
            <li v-if="state.room.chat.length === 0">no messages</li>
          </ul>

          <form @submit.prevent="sendRoomMessage" class="d-flex mt-auto">
            <input class="form-control" type="text" v-model="message">
            <button class="btn btn-success" type="submit">Send</button>
          </form>
        </div>
      </div>
      <div class="col-sm-12 col-lg-3 mb-3 h-100 border-dark-subtle order-sm-last">
        <div class="bg-white card card-body rounded shadow-lg">
          <div class="d-flex justify-content-between">
            <h5 class="fw-bold d-inline">{{ state.room.name }}</h5>
            <p class="badge bg-dark">{{ state.room.players.length }} / {{ state.room.capacity }} players</p>
          </div>
          <hr>
          <h6>Settings</h6>
          <ul>
            <li>Topics: N/A</li>
            <li>Rounds: N/A</li>
            <li>Difficulty: N/A</li>
          </ul>
          <hr>
          <div class="d-flex">
            <button class="btn btn-sm btn-danger" @click="leaveRoom">Leave Room</button>
            <button class="btn btn-sm btn-success ms-auto" @click="startGame">Start Game</button>
          </div>
        </div>

        <div class="bg-white card card-body rounded border-dark shadow-sm mt-3">
          <h5>Players</h5>
          <ol>
            <li v-for="player in state.room.players">{{ player.username }} - {{ state.room.scores[player.id] }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>

import {leaveRoom, state} from "@/state";
import {computed, ref} from "vue";
import {socket} from "@/network/socket";
import {toast} from "@/util";
import LobbyChat from "@/components/GamePage/Lobby/LobbyChat.vue";


// Game Related Funcs
function startGame() {
  socket.emit("room:startGame", {
    slug: state.room.slug
  });
}

// Networking
socket.on("room:chatMessage", (message) => {
  console.log("Got message: " + message);
  state.room.chat = state.room.chat.concat(message);
});

socket.on("room:alert", (message) => {
  toast(message);
});


</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-content-stretch">
      <LobbyChat />

      <!-- Room Info -->
      <div class="col-sm-12 col-lg-3 mb-3 h-100 border-dark-subtle order-sm-last">
        <div class="bg-white card card-body rounded shadow-lg">
          <div class="d-flex justify-content-between">
            <h5 class="fw-bold d-inline">{{ state.room.name }}</h5>
            <p class="badge bg-dark">{{ state.room.clients.length }} / {{ state.room.capacity }} players</p>
          </div>
          <hr>
          <h6>Settings</h6>
          <ul>
            <li><b>Topics</b>: All</li>
            <li><b>Difficulty</b>: Normal</li>
          </ul>
          <hr>
          <div class="d-flex">
            <button class="btn btn-sm btn-danger" @click="leaveRoom">Leave Room</button>
            <button class="btn btn-sm btn-success ms-auto" @click="startGame">Start Game</button>
          </div>
        </div>

        <!-- Players -->
        <div class="bg-white card card-body rounded border-dark shadow-sm mt-3">
          <h5>Players</h5>
          <ol class="m-0">
            <li v-for="client in state.room.clients" class="mb-2">
              {{ client.username }}
              <span class="badge small bg-warning text-black float-end">{{ state.room.scores[client.id] }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
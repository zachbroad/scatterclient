<script setup>

import {leaveRoom, state} from "@/state";
import {computed, ref} from "vue";
import {socket} from "@/network/socket";
import {ApplicationStatus} from "@/util";

// Messaging
const message = ref("");

function sendRoomMessage() {
  if (message.value.trim() !== "") {
    socket.emit("room:message", {
      room: state.room.slug,
      message: message.value
    });
  }

  // Reset message value
  message.value = "";
}

// Game Related Funcs
function startGame() {
  socket.emit("room:startGame", {
    slug: state.room.slug
  });
}

// Networking
socket.on("room:message", (message) => {
  console.log("Got message: " + message);
  state.room.chat = state.room.chat.concat(message);
});

// Used to auto scroll to bottom with flex-direction reverse col
const reversedChat = computed(() => {
  let chat = [...state.room.chat];
  return chat.reverse();
});

</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-content-stretch">
      <div class="col-sm-12 col-lg-5 mb-3 order-sm-first">

        <!-- Chat -->
        <div class="bg-white card card-body rounded border-dark shadow-sm" style="height: 420px;">
          <h5>Chat</h5>

          <!-- Chat Box -->
          <ul class="chat-box">
            <li v-for="chat in reversedChat" v-text="chat"></li>
          </ul>

          <!-- Chat Input Box -->
          <form @submit.prevent="sendRoomMessage" class="d-flex mt-auto">
            <input class="form-control" type="text" v-model="message">
            <button class="btn btn-success ms-2" type="submit">Send</button>
          </form>
        </div>
      </div>
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

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
}


</style>
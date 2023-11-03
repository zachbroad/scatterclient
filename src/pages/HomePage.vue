<script setup>

import {state} from "@/state";

import {onMounted, onUnmounted, ref} from "vue";
import RoomListItem from "@/components/RoomListItem.vue";
import Navbar from "@/components/Navbar.vue";
import {APP_TITLE} from "@/config";
import {socket, startSinglePlayer} from "@/network/socket";
import {toast} from "@/util";

const input = ref("");

function submitInput() {
  socket.emit("global:message", input.value);
  input.value = "";
}

function getRoomNameAndCreate() {
  const slug = prompt("What would you like to name your room?");
  socket.emit("room:create", slug);
}

function joinRandomRoom() {
  socket.emit("room:joinRandomRoom");
}

function disconnect() {
  if (!socket.connected) {
    toast("You already are disconnected!");
    console.error("Tried to disconnect but not connected!");
    return;
  }

  socket.disconnect();

  toast(`You have been disconnected from ${APP_TITLE}`);
}

function askForRooms() {
  socket.emit("global:roomList");
}

var keepAskingInterval = null;

/* Refresh rooms */
onMounted(() => {
  const REFRESH_INTERVAL = 1000;

  keepAskingInterval = setInterval(() => {
    askForRooms();
  }, REFRESH_INTERVAL);
});

onUnmounted(() => {
  clearInterval(keepAskingInterval);
});


</script>

<template>
  <Navbar :center="APP_TITLE"/>
  <div class="container mt-3">
    <div class="bg-white p-3 mb-5 rounded align-items-center shadow shadow-lg border border-black"
         style="max-width: 580px; margin: 0 auto">

      <div class="d-flex mb-4">
        <p>Connected as {{ state.name }}</p>
        <button class="btn btn-sm btn-danger ms-auto" @click="disconnect">Disconnect</button>
      </div>
      <div class="d-flex flex-row justify-content-end">
        <button class="btn btn-sm btn-outline-primary me-2" @click="startSinglePlayer">Single Player Game</button>
        <button class="btn btn-sm btn-outline-success me-2" @click="joinRandomRoom">Join Random Room</button>
        <button class="btn btn-sm btn-success " @click="getRoomNameAndCreate">Create Room</button>
      </div>
    </div>

    <div style="max-width: 780px; margin: 0 auto;">
      <div class="bg-white p-3 mb-3 rounded align-items-center shadow border border-black">
        <div class="d-flex justify-content-between">
          <h3 class="m-0">🏠 Room List 🏠</h3>
        </div>
        <small>{{ state.rooms.length }} rooms</small>
      </div>
      <RoomListItem v-for="room in state.rooms" :room="room"/>


      <div v-if="state.rooms.length === 0"
           class="bg-white p-3 mb-3 rounded align-items-center shadow border border-black text-center">
        <b>😢 no rooms found 😢</b>
      </div>
    </div>

    <!--    <div class="card card-body bg-dark-subtle">-->
    <!--      <h3>ScatterChat</h3>-->
    <!--      <ul>-->
    <!--        <li v-for="message in state.messages">{{ message }}</li>-->
    <!--        <li v-if="state.messages.length === 0">no messages</li>-->
    <!--      </ul>-->

    <!--      <form @submit.prevent="submitInput" class="d-flex">-->
    <!--        <input type="text" v-model="input" class="form-control">-->
    <!--        <button type="submit" class="btn btn-sm btn-primary">Send</button>-->
    <!--      </form>-->
    <!--    </div>-->
  </div>
</template>

<style scoped>

</style>
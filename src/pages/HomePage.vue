<script setup>

import {state} from "@/state";

import {onMounted, onUnmounted, ref} from "vue";
import RoomListItem from "@/components/RoomListItem.vue";
import Navbar from "@/components/Navbar.vue";
import {APP_TITLE} from "@/config";
import {socket, startSinglePlayerGame} from "@/network/socket";
import {toast} from "@/util";
import HomeRoomsList from "@/components/HomeRoomsList.vue";

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

function changeName() {
  const newName = prompt("What would you like to change your name to?");
  socket.emitWithAck("global:changeName", newName);
  // change name in state
  state.name = newName;
}


</script>

<template>
  <Navbar :center="APP_TITLE"/>
  <div class="container mt-3">
    <div class="bg-white p-3 mb-5 rounded align-items-center shadow shadow-lg border border-black"
         style="max-width: 580px; margin: 0 auto">

      <div class="d-flex mb-4">
        <p>Connected as {{ state.name }}</p>
        <button class="btn btn-sm btn-outline-primary ms-auto me-2" @click="changeName">Change Name</button>
        <button class="btn btn-sm btn-danger " @click="disconnect">Disconnect</button>
      </div>
      <div class="d-flex flex-row justify-content-end">
        <button class="btn btn-sm btn-outline-primary me-2" @click="startSinglePlayerGame">Single Player Game</button>
        <button class="btn btn-sm btn-outline-success me-2" @click="joinRandomRoom">Join Random Room</button>
        <button class="btn btn-sm btn-success " @click="getRoomNameAndCreate">Create Room</button>
      </div>
    </div>

    <HomeRoomsList />


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
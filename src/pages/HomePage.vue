<script setup>

import {state} from "@/state";

import {ref} from "vue";
import RoomListItem from "@/components/RoomListItem.vue";
import Navbar from "@/components/Navbar.vue";
import {APP_TITLE} from "@/config";
import {socket} from "@/network/socket";

const input = ref("");

function submitInput() {
  socket.emit('global:message', input.value);
  input.value = "";
}

function getRoomNameAndCreate() {
  const slug = prompt('What would you like to name your room?');
  socket.emit('room:create', slug);
}

function startSinglePlayer() {
  socket.emit('room:singlePlayer');
}

function joinRandomRoom() {

}

</script>

<template>
  <Navbar :center="APP_TITLE"/>
  <div class="container mt-3">
    <div class="bg-white p-3 mb-5 rounded align-items-center shadow shadow-lg border border-black"
         style="max-width: 580px; margin: 0 auto">

      <p>Connected as {{ state.name }}</p>

      <div class="d-flex flex-row justify-content-end">
        <button class="btn btn-sm btn-outline-primary me-2" @click="startSinglePlayer">Single Player Game</button>
        <button class="btn btn-sm btn-outline-success me-2" @click="joinRandomRoom">Join Random Room</button>
        <button class="btn btn-sm btn-success " @click="getRoomNameAndCreate">Create Room</button>
      </div>
    </div>

    <div style="max-width: 780px; margin: 0 auto;">
      <div class="bg-white p-3 mb-3 rounded align-items-center shadow border border-black">
        <h3 class="m-0">🏠 Room List 🏠</h3>
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
<script setup>

import {socket, state} from "@/io";

import {ref} from "vue";

const input = ref("");

function submitInput() {
  socket.emit('global:message', input.value)
  input.value = "";
}

</script>

<template>
  <div class="container mt-3">
    <h3>
      Room List
      <button class="btn btn-sm btn-success float-end">new room</button>
    </h3>
    <RoomListItem v-for="room in state.rooms" :room="room"/>
    <b v-if="state.rooms.length === 0">no rooms</b>

    <div class="card card-body bg-dark-subtle">
      <h3>ScatterChat</h3>
      <ul>
        <li v-for="message in state.messages">{{ message }}</li>
        <li v-if="state.messages.length === 0">no messages</li>
      </ul>

      <form @submit.prevent="submitInput" class="d-flex">
        <input type="text" v-model="input" class="form-control">
        <button type="submit" class="btn btn-sm btn-primary">Send</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
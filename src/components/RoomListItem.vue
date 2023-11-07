<script setup>


import {computed} from "vue";
import {GameStatus} from "@/util";
import {socket} from "@/network/socket";

const {room} = defineProps(["room"]);

function joinRoom() {
  console.log("trying to join room");
  socket.emit("room:join", room.slug);
}

const canJoin = computed(() => room.status === GameStatus.Waiting);

</script>

<template v-if="room.isPublic">
  <div class="card card-body mb-2">
    <h5 class="fw-bold">
      {{ room.name }}
      <span class="badge bg-dark rounded-pill ml-auto float-end">{{ room.status }}</span>
    </h5>
    <small>{{ room.slug }}</small>
    <p>{{ room.clients.length }} / {{ room.capacity }} players</p>
    <button @click="joinRoom" class="btn btn-outline-primary" :disabled="!canJoin">join room</button>
  </div>
</template>

<style scoped>

</style>

<script setup>
import {computed, ref} from "vue";
import {state} from "@/state";
import {socket} from "@/network/socket";
import LobbyChatMessage from "@/components/GamePage/Lobby/LobbyChatMessage.vue";

const message = ref("");

function sendRoomMessage() {
  if (message.value.trim() !== "") {
    socket.emit("room:chatMessage", {
      room: state.room.slug,
      message: message.value
    });
  }

  // Reset message value
  message.value = "";
}

// Used to auto scroll to bottom with flex-direction reverse col
const reversedChat = computed(() => {
  let chat = [...state.room.chat];
  return chat.reverse();
});
</script>

<template>
  <div class="col-sm-12 col-lg-5 mb-3 order-sm-first">
    <div class="bg-white card card-body rounded border-dark shadow-sm" style="height: 420px;">
      <h5>Chat</h5>

      <!-- Chat Box -->
      <div class="chat-box">
        <LobbyChatMessage v-for="message in reversedChat" :data="message" />
      </div>

      <!-- Chat Input Box -->
      <form @submit.prevent="sendRoomMessage" class="d-flex mt-auto">
        <input class="form-control" type="text" v-model="message">
        <button class="btn btn-success ms-2" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  height: 100%;
  margin-bottom: .25rem;
}
</style>
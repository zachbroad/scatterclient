<script setup>
import {ref, watchEffect} from "vue";
import RoomListItem from "./components/RoomListItem.vue";
import {socket, state} from "./io";
import RoomView from "./components/RoomView.vue";
import {ApplicationStatus} from "./util";
import {useToast} from "vue-toast-notification";
import Lobby from "@/components/Lobby.vue";
import Navbar from "@/components/Navbar.vue";


const input = ref("");

const $toast = useToast();

function submitInput() {
  socket.emit('global:message', input.value)
  input.value = "";
}

watchEffect(() => {
  socket.connect();

  socket.on('connect', () => {
    console.log('connection!')
    state.connected = true

    const engine = socket.io.engine;
    // console.log(engine.transport.name); // in most cases, prints "polling"

    engine.once("upgrade", () => {
      // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
      // console.log(engine.transport.name); // in most cases, prints "websocket"
    });

    engine.on("packet", ({type, data}) => {
      // called for each packet received
    });

    engine.on("packetCreate", ({type, data}) => {
      // called for each packet sent
    });

    engine.on("drain", () => {
      // called when the write buffer is drained
    });

    engine.on("close", (reason) => {
      // called when the underlying connection is closed
    });
  })

  socket.on('disconnect', () => {
    console.log('disconnection!');
    state.connected = false;
  })

  socket.on('global:message', msg => {
    state.messages = [...state.messages, msg];
  })

  socket.on('global:messageHistory', msgs => {
    state.messages = msgs;
  })

  socket.on('error', msg => {
    console.error(msg);
    $toast.error(msg);
  })

  socket.on('message', msg => {
    console.log(msg);
    $toast.default(msg);
  })

  socket.on('global:roomList', rooms => {
    console.dir(rooms);
    state.rooms = rooms;
  })

  socket.on('room:data', room => {
    state.appStatus = ApplicationStatus.InGame;
    state.room = room;
    console.log(`Got room data: ${room}`);
  })
})


</script>

<template>
  <Navbar />

  <template v-if="state.connected">
    <template v-if="state.appStatus === ApplicationStatus.InMainLobby">
      <Lobby />
    </template>

    <template v-else-if="state.appStatus === ApplicationStatus.InGame">
      <RoomView class="container mt-3"/>
    </template>
  </template>

  <div class="container" v-else>
    Not connected...
  </div>
</template>

<style scoped>
</style>

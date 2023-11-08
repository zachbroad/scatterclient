<script setup>
import {state} from "@/state";
import Countdown from "@/components/Countdown.vue";
import ScattergoriesBoardResult from "@/components/GameBoard/ScattergoriesBoardResult.vue";
import {socket} from "@/network/socket";

function voteGoToLobby() {
  socket.emit("room:voteGoToLobby", {
    room: state.room
  });
}

</script>

<template>
  <div class="container">
    <div class="row">

      <!-- Results -->
      <div class="d-flex my-4 flex-column">
        <div class="justify-content-center bg-white text-center py-4 rounded mx-auto px-4 border border-dark">
          <h1 class="">The results are in!</h1>
          <Countdown :time="state.room.game.resultsDuration"/>
          <p>Winner: {{ state.room.game.winner ? state.room.game.winner.username : "N/A" }}</p>
        </div>
      </div>

      <!-- Go To Lobby -->
      <div class="d-flex my-4 flex-column">
        <div class="justify-content-center bg-white text-center py-4 rounded mx-auto px-4">
          <ul v-for="client in state.room.clients">
            <li>{{ client.username }} - {{ state.room.clickedOkResults[client.id] ? "rdy" : "not rdy" }}</li>
          </ul>
          <button @click="voteGoToLobby">Go To Lobby</button>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div class="row">
      <ScattergoriesBoardResult
          v-for="(result, key) in state.room.game.results"
          class="col-sm-12 col-md-6 col-lg-6"
          :prompts="state.room.game.currentPrompts"
          :answers="result.answers"
          :results="result.results"
          :username="key"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
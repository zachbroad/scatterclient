<script setup>
import {state} from "@/state";
import {GameStatus} from "@/util";
import Lobby from "@/components/GamePage/Lobby.vue";
import Results from "@/components/GamePage/Results.vue";
import Scoring from "@/components/GamePage/Scoring.vue";
import Starting from "@/components/GamePage/Starting.vue";
import InProgress from "@/components/GamePage/InProgress.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <!--  Waiting -->
  <div v-if="state.room.status === GameStatus.Waiting">
    <Navbar :center="state.room.name"/>
    <Lobby/>
  </div>
  <!-- Starting -->
  <div v-else-if="state.room.status === GameStatus.Starting">
    <Navbar :center="state.room.name"/>
    <Starting/>
  </div>

  <!-- In Progress -->
  <div v-else-if="state.room.status === GameStatus.InProgress">
    <InProgress/>
  </div>

  <!-- Scoring -->
  <div v-else-if="state.room.status === GameStatus.Scoring">
    <Navbar :center="state.room.name"/>
    <Scoring/>
  </div>

  <!-- Results -->
  <div v-else-if="state.room.status === GameStatus.Results">
    <Navbar :center="state.room.name"/>
    <Results/>
  </div>

  <div v-else>
    Error: no game
    {{ state }}
  </div>
</template>

<style scoped>

</style>
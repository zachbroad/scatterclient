<script setup>
import {initializeSocket} from "@/network/socket";
import {state} from "./state";
import {watchEffect} from "vue";

import GamePage from "./pages/GamePage.vue";
import HomePage from "@/pages/HomePage.vue";
import WelcomeScreen from "@/pages/WelcomeScreen.vue";

import "bootstrap/scss/bootstrap.scss";
import "bootswatch/dist/sketchy/bootstrap.css";
import {ApplicationStatus} from "@/variables";

// watchEffect(() => {
//   initializeSocket();
// })


</script>

<template>
  <BToaster/>
  <template v-if="!state.connected">
    <WelcomeScreen/>
  </template>

  <template v-if="state.connected">
    <template v-if="state.status === ApplicationStatus.InMainLobby">
      <HomePage/>
    </template>

    <template v-else-if="state.status === ApplicationStatus.InGame">
      <GamePage/>
    </template>
  </template>

</template>

<style scoped>
</style>

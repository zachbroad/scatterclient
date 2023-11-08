<script setup>
import {ApplicationStatus} from "./util";
import {initializeSocket} from "@/network/socket";
import {state} from "./state";
import {watchEffect} from "vue";

import GamePage from "./pages/GamePage.vue";
import HomePage from "@/pages/HomePage.vue";
import WelcomeScreen from "@/pages/WelcomeScreen.vue";

import "bootstrap/scss/bootstrap.scss";
import "bootswatch/dist/sketchy/bootstrap.css";

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

  <!--  <div class="container" v-else>-->
  <!--    <div class="card card-body">-->
  <!--      Not connected...-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped>
</style>

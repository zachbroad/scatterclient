<script setup>
import Countdown from "@/components/Countdown.vue";
import {state} from "@/state";

</script>

<template>
  <div class="container">
    <div class="text-center p-3 mb-3 align-items-center d-flex">
      <div class="p-5 bg-white shadow border border-black rounded mx-auto">
        <h1 class="text-center">GET READY!</h1>
        <Countdown :time="state.room.game.lobbyDuration"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
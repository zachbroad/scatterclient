<script setup>

import {APP_TITLE} from "@/config";
import GameOverviewInfo from "@/components/GameOverviewInfo.vue";
import {computed, ref} from "vue";
import Navbar from "@/components/Navbar.vue";
import {state} from "@/state";
import {initializeSocket} from "@/network/socket";
import {useToast} from "bootstrap-vue-next";
import {toast} from "@/util";

const username = ref("");
const {show} = useToast();

const usernameValid = computed(() => username.value.trim().length !== 0);

function connect() {
  if (!usernameValid) {
    toast('You must enter a username!');
    return;
  }

  state.name = username.value;
  initializeSocket();
}

</script>

<template>
  <Navbar :center="`${ APP_TITLE }`"/>

  <div class="container">
    <div class="bg-white p-3 mb-2 rounded shadow border border-black mx-auto"
         style="max-width: 400px">
      <h2>Play {{ APP_TITLE }}</h2>
      <p>Choose a username to play online with others or start a Single Player game!</p>

      <form @submit.prevent="connect" :disabled="!usernameValid">
        <input v-model.trim="username" placeholder="Username" id="username" type="text" class="form-control">

        <div class="d-flex justify-content-around mt-3">
          <button class="btn btn-primary">Play Single Player</button>
          <button class="btn btn-success" :disabled="!usernameValid" type="submit">Connect to Server</button>
        </div>
      </form>
    </div>
  </div>

  <GameOverviewInfo/>
</template>

<style scoped>

</style>
<script setup>
import {goHome, isUserLoggedIn, state} from "@/state";
import {ApplicationStatus, GameStatus} from "@/variables";

defineProps(["left", "center", "right"]);
</script>

<template>
  <div class="container px-5 sticky-top pt-1">
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top m-4">
      <div class="container-fluid align-items-center">

        <div v-if="left" v-html="left"></div>
        <div v-else>
          <a v-if="state.status === ApplicationStatus.InGame" href="/public" @click.prevent="goHome">Home</a>
        </div>

        <a class="navbar-brand fw-bold align-self-center mx-auto" href="/public">{{ center }}</a>

        <div v-if="right" v-html="right"></div>

      </div>
    </nav>
  </div>
</template>

<style scoped>

</style>
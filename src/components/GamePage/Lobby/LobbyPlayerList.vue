<script setup>

import {state} from "@/state";
</script>

<template>
  <!-- Players -->
  <div class="bg-white card card-body rounded border-dark shadow-sm mt-3">
    <h5>Players</h5>
    <ol class="m-0">
      <li v-for="client in state.room.clients" class="mb-2">
        {{ client.username }}
        <span class="badge small bg-warning text-black float-end">{{ state.room.scores[client.id] }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>

</style>
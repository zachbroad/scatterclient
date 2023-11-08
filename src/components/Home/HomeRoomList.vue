<script setup>
import {state} from "@/state";
import HomeRoomListItem from "@/components/Home/HomeRoomListItem.vue";

defineProps(["rooms"]);
</script>

<template>
  <div style="max-width: 780px; margin: 0 auto;">
    <div class="bg-white p-3 mb-3 rounded align-items-center shadow border border-black">
      <div class="d-flex justify-content-between">
        <h3 class="m-0">🏠 Room List 🏠</h3>
      </div>
      <small>{{ state.rooms.length }} rooms</small>
    </div>

    <HomeRoomListItem v-for="room in state.rooms" :room="room"/>

    <div v-if="state.rooms.length === 0"
         class="bg-white p-3 mb-3 rounded align-items-center shadow border border-black text-center">
      <b>😢 no rooms found 😢</b>
    </div>
  </div>
</template>

<style scoped>
</style>
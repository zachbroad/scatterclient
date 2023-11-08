<script setup>
defineProps(["data"]);
</script>

<template>
  <div class="chat-message">
    <span class="fw-bolder">{{ data.username }}: <span class="fw-medium">{{ data.message }}</span></span>
    <small class="ms-auto fw-lighter">[{{ data.timestamp }}]</small>
  </div>
</template>

<style scoped>
.chat-message {
  display: flex;
}
</style>
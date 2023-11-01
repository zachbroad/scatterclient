<script setup>
defineProps(['left', 'center', 'right']);
</script>

<template>
  <div class="container px-5">
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top m-4">
      <div class="container-fluid align-items-center">
        <div v-if="left" v-html="left"></div>
        <a class="navbar-brand fw-bold align-self-center mx-auto" href="/">{{ center }}</a>
        <div v-if="right" v-html="right"></div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

</style>
<script setup>

import {APP_TITLE} from "@/config";
</script>

<template>
  <div class="container mt-5" style="max-width: 920px">
    <div class="row p-2">
      <div class="col-sm-12 col-lg-6 text-center mb-3 rounded align-items-center ">
        <div class="bg-white rounded border-black shadow border p-3">
          <h2>🤔 What is {{ APP_TITLE }}? 🤔</h2>
          <p>
            {{ APP_TITLE }} is a creative-thinking category-based party game originally.
            🎲 The objective of the game is to quickly come up with unique words or phrases that fit into specific
            categories, given an initial letter within a time limit ⏳.
          </p>
          <a href="https://en.wikipedia.org/wiki/Categories_(word_game)" target="_blank" class="btn btn-primary">Learn More!</a>
        </div>
      </div>
      <div class="col-sm-12 col-lg-6 mb-3 rounded align-items-center ">
        <div class="bg-white rounded border-black shadow border p-3">
          <h2 class="text-center">🎮 How to Play 🎮</h2>
          <ol>
            <li>📝 Each player receives a category list and a writing pad.</li>
            <li>🔠 A letter is randomly chosen.</li>
            <li>⏲️ Start the timer! You have a limited time to come up with words that fit the categories on your list,
              starting with the chosen letter.
            </li>
            <li>⏰ When the time is up, players compare answers, crossing out duplicates.</li>
            <li>🏆 Score points for unique answers.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
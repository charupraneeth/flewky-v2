<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <h1>Flewky</h1>
  <router-link to="/">Go to Home</router-link>
  <router-link to="/app">Go to About</router-link>

  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</template>

<style scoped></style>

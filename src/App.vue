<template>
  <the-navbar></the-navbar>
  <router-view />
</template>

<script setup>
import TheNavbar from './components/TheNavbar.vue';
</script>

<style scoped>
.links {
  display: flex;
  justify-content: space-between;
}
.router-view {
  margin-top: 5rem;
}
</style>

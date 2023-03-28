<template>
  <!-- <div class="links">
    <router-link to="/">Home</router-link>
    <router-link to="/stat">Statistiks</router-link>
  </div>
  <router-view class="router-view" /> -->

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

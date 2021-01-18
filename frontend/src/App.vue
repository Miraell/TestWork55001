<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <transition mode="out-in" name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
</style>

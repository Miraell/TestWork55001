<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <h1 class="top-title">JobHunter</h1>
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
          <router-link to='/' class="navbar-item">Home</router-link>
          <router-link to='/job-postings' class="navbar-item">Job Postings</router-link>
      </div>
      <div class="navbar-end">
        <LoginButtons />
      </div>
    </div>
  </nav>
</template>

<script>
import LoginButtons from './LoginButtons.vue';

export default {
  name: 'Navbar',
  components: {
    LoginButtons
  }
}
</script>

<style>
  .top-title {
    font-size: 32px;
    font-weight: 300;
    color: #7957d5;
  }
  .navbar-item {
    font-size: 20px;
  }
</style>

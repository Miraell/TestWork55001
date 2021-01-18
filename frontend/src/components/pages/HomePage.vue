<template>
  <section class="hero welcome is-small">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Welcome, {{currentUserName || 'guest'}}.
        </h1>
        <h2 class="subtitle">
          <p>This is job board application.</p><br>
          <p>Features implemented:</p>
        </h2>
          <div class="content">
            <ol class="is-upper-roman">
              <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
            </ol>
          </div>
        <h2 class="subtitle">
          By the way, it was designed and programmed by <strong>Dmitry Podtyagin</strong> :)
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      features: [
        'Authentication using JWT',
        'Form validation',
        'CRUD for job postings',
        'Basic UI',
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentUserName: 'auth/getCurrentUserName',
    }),
  },
}
</script>

<style>
</style>

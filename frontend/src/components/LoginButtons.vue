<template>
  <div class="navbar-item">
    <div class="buttons">

        <div v-if="!isLoggedIn">
          <router-link to="/register" class="button is-primary">
            <strong>Sign up</strong>
          </router-link>
          <router-link to="/login" class="button is-light">
            Login
          </router-link>
        </div>

        <div v-if="isLoggedIn">
          <b-button v-on:click="logout" type="is-primary" outlined>Logout</b-button>
        </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'LoginButtons',
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/getAccessToken',
    }),
  },
}
</script>

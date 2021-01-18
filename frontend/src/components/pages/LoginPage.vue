<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">

      <h2 class="login-form-title">Login form</h2>

      <form @submit.prevent="handleSubmit">

        <div class="field">
          <label class="label">E-Mail</label>
          <div class="control">
            <input class="input" :class="{ 'is-danger': $v.email.$error }" v-model.lazy="$v.email.$model" type="email" placeholder="Enter your email">
          </div>
          <p v-if="!$v.email.email" class="help is-danger">E-Mail must be a valid email address.</p>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" :class="{ 'is-danger': $v.password.$error }" v-model.lazy="$v.password.$model" type="password" placeholder="Enter your password">
            <p v-if="!$v.password.minLength" class="help is-danger">Password must be at least {{$v.email.$params.minLength.min}} letters</p>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button
              class="button is-link"
              :class="{'is-loading': isRequestInProgress }"
              :disabled="isRequestInProgress"
            >Login</button>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { ToastProgrammatic as Toast } from 'buefy';
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters({
      isRequestInProgress: 'auth/isRequestInProgress',
    }),
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    handleSubmit: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Toast.open({ message: 'Please enter correct values', type: 'is-warning' });
      } else {
        this.login({email: this.email, password: this.password});
      }
    }
  }
}
</script>

<style>
.login-form-title {
  font-size: 25px;
  text-align: center;
  margin: 20px;
}
</style>

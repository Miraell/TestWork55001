<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">

      <h2 class="login-form-title">Register form</h2>

      <form @submit.prevent="handleSubmit">

        <div class="field">
          <label class="label">Your name</label>
          <div class="control">
            <input class="input" :class="{ 'is-danger': $v.name.$error }" v-model.lazy="$v.name.$model" type="text" placeholder="Enter your name">
            <p v-if="$v.name.$error" class="help is-danger">Name must be at least {{$v.name.$params.minLength.min}} letters</p>
          </div>
        </div>

        <div class="field">
          <label class="label">E-Mail (used for logging in)</label>
          <div class="control">
            <input class="input" :class="{ 'is-danger': $v.email.$error }" v-model.lazy="$v.email.$model" type="text" placeholder="Enter your email">
            <p v-if="$v.email.$error" class="help is-danger">Enter valid email</p>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" :class="{ 'is-danger': $v.password.$error }" v-model.trim="$v.password.$model" type="password" placeholder="Enter your password">
            <p v-if="$v.password.$error" class="help is-danger">Password must be at least {{$v.email.$params.minLength.min}} letters</p>
          </div>
        </div>

        <div class="field">
          <label class="label">Confirm password</label>
          <div class="control">
            <input class="input" :class="{ 'is-danger': $v.repeatPassword.$error }" type="password" v-model.trim="$v.repeatPassword.$model" placeholder="Repeat your password">
            <p v-if="$v.repeatPassword.$error" class="help is-danger">Enter same password</p>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button
              class="button is-link"
              :class="{'is-loading': isRequestInProgress }"
              :disabled="isRequestInProgress"
            >Register</button>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    }
  },
  computed: {
    ...mapGetters({
      isRequestInProgress: 'auth/isRequestInProgress',
    }),
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(4)
    },
    repeatPassword: {
      required,
      minLength: minLength(4),
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
    }),
    handleSubmit: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Toast.open({ message: 'Please enter correct values', type: 'is-warning' });
      } else {
        this.register({name: this.name, email: this.email, password: this.password});
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

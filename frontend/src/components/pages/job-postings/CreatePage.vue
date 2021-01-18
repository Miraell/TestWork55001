<template>
  <section class="hero welcome is-small">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-one-quarter">
          <h1 class="title">Create job posting</h1>
          <form @submit.prevent="handleSubmit">
            <JobPostingForm @update="handleFormChange"/>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ToastProgrammatic as Toast } from 'buefy';
import JobPostingForm from './JobPostingForm.vue';

export default {
  name: 'CreatePage',
  data() {
    return {
      formData: {},
    }
  },
  components: {
    JobPostingForm
  },
  methods: {
    handleFormChange: function (formData) {
      this.formData = formData;
    },
    handleSubmit: function () {
      if (this.formData.invalid) {
        Toast.open({ message: 'Please enter correct values', type: 'is-warning' });
      } else {
        this.$store.dispatch('jobPostings/create', {...this.formData});
      }
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}
</style>

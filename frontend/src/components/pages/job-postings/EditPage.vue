<template>
  <section class="hero welcome is-small">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-one-quarter">
          <h1 class="title">Edit job posting</h1>
          <form @submit.prevent="handleSubmit">
            <JobPostingForm @update="handleFormChange" v-bind:jobPostingToEdit="formData" />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { ToastProgrammatic as Toast } from 'buefy';
import JobPostingForm from './JobPostingForm.vue';
import JobPostingsService from '../../../services/JobPostingsService.js';

export default {
  name: 'EditPage',
  components: {
    JobPostingForm
  },
  created: async function() {
    const id = this.$route.params.id;
    const { data } = await JobPostingsService.findById(id);
    this.formData = data.data;
  },
  data() {
    return {
      formData: {},
    }
  },
  methods: {
    ...mapActions({
      update: 'jobPostings/update',
      findById: 'jobPostings/findById',
    }),
    handleFormChange: function (formData) {
      this.formData = formData;
    },
    handleSubmit: function () {
      if (this.formData.invalid) {
        Toast.open({ message: 'Please enter correct values', type: 'is-warning' });
      } else {
        this.update(this.formData);
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

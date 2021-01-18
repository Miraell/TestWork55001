<template>
  <div>
    <div v-if="jobPostingToEdit" class="field">
      <label class="label">ID</label>
      <div class="control">
        <input class="input" disabled :value="jobPostingToEdit.id">
      </div>
    </div>

    <div class="field">
      <label class="label">Job title</label>
      <div class="control">
        <input class="input" :class="{ 'is-danger': $v.formData.title.$error }" v-model.lazy="$v.formData.title.$model" type="text" placeholder="Front-End developer">
        <p v-if="$v.formData.title.$error" class="help is-danger">Job title must be at least {{$v.formData.title.$params.minLength.min}} letters</p>
      </div>
    </div>

    <div class="field">
      <label class="label">Company name</label>
      <div class="control">
        <input class="input" :class="{ 'is-danger': $v.formData.company.$error }" v-model.lazy="$v.formData.company.$model" type="text" placeholder="Enter company name">
        <p v-if="$v.formData.company.$error" class="help is-danger">Company name is required</p>
      </div>
    </div>

    <div class="field">
      <label class="label">Salary</label>
      <div class="control">
        <input class="input" :class="{ 'is-danger': $v.formData.salary.$error }" v-model.lazy="$v.formData.salary.$model" type="number" placeholder="1000000">
        <p v-if="$v.formData.salary.$error" class="help is-danger">Salary must be a number</p>
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" :class="{ 'is-danger': $v.formData.description.$error }" v-model.lazy="$v.formData.description.$model" placeholder="Requirements, extra information, etc..."></textarea>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button @click="updateForm" class="button is-link is-medium is-success is-rounded">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, numeric } from 'vuelidate/lib/validators';

export default {
  name: 'JobPostingForm',
  props: ['jobPostingToEdit'],
  data() {
    return {
      formData: {
        title: '',
        company: '',
        salary: '',
        description: '',
      },
    }
  },
  watch: {
    jobPostingToEdit: function (jobPosting) {
      this.formData = jobPosting;
    }
  },
  validations: {
    formData: {
      title: {
        required,
        minLength: minLength(4)
      },
      company: {
        required,
      },
      salary: {
        required,
        numeric,
      },
      description: {
        required,
      }
    }
  },
  methods: {
    updateForm() {
      this.$v.$touch();
      this.$emit('update', {...this.formData, invalid: this.$v.$invalid});
    },
  }
}
</script>

<style>
</style>

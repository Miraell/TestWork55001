<template>
  <section class="hero welcome is-small">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">All job postings</h1>
        <div class="buttons">
          <router-link to="/job-postings/create" class="button is-success is-rounded">
            <span class="icon mdi mdi-plus-circle"></span><span>Add</span>
          </router-link>
          <button v-on:click="handleEdit" :disabled="!selected.id" class="button is-warning is-rounded">
            <span class="icon mdi mdi-pencil-outline"></span><span>Edit</span>
          </button>
          <button v-on:click="handleDelete" :disabled="!selected.id" class="button is-danger is-rounded">
            <span class="icon mdi mdi-delete"></span><span>Delete</span>
          </button>
        </div>
        <hr>
        <b-table
          :loading="isLoading" :data="jobPostingsList" :columns="columns"
          :paginated="true" :per-page="10" :pagination-rounded="true"
          :selected.sync="selected" hoverable>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { ToastProgrammatic as Toast } from 'buefy';

export default {
  name: 'JobPostingsListPage',
  methods: {
    ...mapActions({
      fetchList: 'jobPostings/fetchList',
      delete: 'jobPostings/delete',
    }),
    handleEdit() {
      if (this.selected.id) {
        this.$router.push(`/job-postings/edit/${this.selected.id}`);
      } else {
        Toast.open({ message: 'Click on a row to select a job posting', type: 'is-warning' });
      }
  },
    handleDelete() {
      if (this.selected.id) {
        this.delete(this.selected.id);
        this.selected = {};
      } else {
        Toast.open({ message: 'Click on a row to select a job posting', type: 'is-warning' });
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'jobPostings/isLoading',
      jobPostingsList: 'jobPostings/getAllJobPostings',
    }),
  },
  created() {
    this.fetchList();
  },
  data() {
    return {
      selected: {},
      columns: [
        {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true
        },
        {
            field: 'title',
            label: 'Position title',
        },
        {
            field: 'company',
            label: 'Company name',
        },
        {
            field: 'salary',
            label: 'Salary ($ per year)',
        },
        {
            field: 'created_at',
            label: 'Posted on',
        }
      ]
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}
</style>

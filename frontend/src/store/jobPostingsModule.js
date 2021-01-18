import { ToastProgrammatic as Toast } from 'buefy';
import router from '../router.js';
import JobPostingsService from '../services/JobPostingsService.js';

const messages = {
  SUCCESS_CREATED: 'Congrats! You just created new job posting!',
  SUCCESS_UPDATED: 'Job posting was updated!',
  SUCCESS_DELETED: 'Job posting was deleted!',
};

export default {

  namespaced: true,
  state: {
    isLoading: false,
    jobPostings: [],
  },

  actions: {

    fetchList({ commit }) {
      commit('isLoading');
      const jobPostingsRequest = JobPostingsService.findAll();

      jobPostingsRequest.then(({ data }) => {
        commit('updateJobPostingsList', data.data);
      });
    },

    create({ commit }, data) {
      commit('isLoading');
      const jobPostingsRequest = JobPostingsService.create(data);

      jobPostingsRequest.then(() => {
        Toast.open({ message: messages.SUCCESS_CREATED, type: 'is-success'});
        router.push('/job-postings');
        commit('success');
      });
    },

    update({ commit }, data) {
      commit('isLoading');
      const jobPostingsRequest = JobPostingsService.update(data);

      jobPostingsRequest.then(() => {
        Toast.open({ message: messages.SUCCESS_UPDATED, type: 'is-success'});
        router.push('/job-postings');
        commit('success');
      });
    },

    delete({ commit, dispatch}, id) {
      commit('isLoading');
      const jobPostingsRequest = JobPostingsService.delete(id);

      jobPostingsRequest.then(() => {
        Toast.open({ message: messages.SUCCESS_DELETED, type: 'is-success'});
        dispatch('fetchList');
        commit('success');
      });
    }

  },

  mutations: {
    isLoading(state) {
      state.isLoading = true;
      state.jobPostings = [];
    },
    updateJobPostingsList(state, jobPostings) {
      state.isLoading = false;
      state.jobPostings = jobPostings;
    },
    success(state) {
      state.isLoading = false;
    },
  },

  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    getAllJobPostings(state) {
      return state.jobPostings;
    }
  }
}

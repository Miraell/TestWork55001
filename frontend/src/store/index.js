import Vue from 'vue';
import Vuex from 'vuex';

import auth from './authModule.js';
import jobPostings from './jobPostingsModule.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    jobPostings
  }
});


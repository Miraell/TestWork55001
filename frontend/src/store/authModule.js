import AuthService from '../services/AuthService.js';
import { ToastProgrammatic as Toast } from 'buefy';
import router from '../router.js';

const messages = {
  SUCCESS_REGISTER: 'Hey! You just registered!',
  SUCCESS_LOGIN: 'Welcome back!',
  INCORRECT_CREDENTIALS: 'User with this credentials does not exist :(',
};

const accessToken = localStorage.getItem('access_token');
const currentUser = localStorage.getItem('currentUser');
const initialState = {
  currentUser,
  accessToken,
  isRequestInProgress: false
};

const successResponseHandler = ({ user, access_token }, message = '') => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('currentUser', JSON.stringify(user));
  Toast.open({ message, type: 'is-success' });
  router.push('/');
}

export default {

  namespaced: true,
  state: initialState,

  actions: {

    register({ commit }, {name, email, password}) {
      commit('requestInProgress');
      const registerRequest = AuthService.register({name, email, password});

      registerRequest.then(({data}) => {
        successResponseHandler(data, messages.SUCCESS_REGISTER);
        commit('loginSuccess', data);
      })

      registerRequest.catch((error) => {
        Toast.open(error.message);
        commit('loginFailure');
      });
    },

    login({ commit }, {email, password}) {
      commit('requestInProgress');
      const loginRequest = AuthService.login({email, password});

      loginRequest.then(({data}) => {
        successResponseHandler(data, messages.SUCCESS_LOGIN);
        commit('loginSuccess', data);
      })

      loginRequest.catch((error) => {
        if (error.response.status === 401) {
          Toast.open({ message: messages.INCORRECT_CREDENTIALS, type: 'is-warning' });
        } else {
          Toast.open({ message: error.message, type: 'is-danger' });
        }
        commit('loginFailure');
      });
    },

    logout({ commit }) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('currentUser');
      router.push('/');
      commit('logout');
    },
  },

  mutations: {
    requestInProgress(state) {
      state.accessToken = null;
      state.currentUser = null;
      state.isRequestInProgress = true;
    },
    loginSuccess(state, data) {
      state.accessToken = data.access_token;
      state.currentUser = data.user;
      state.isRequestInProgress = false;
    },
    loginFailure(state) {
      state.accessToken = null;
      state.currentUser = null;
      state.isRequestInProgress = false;
    },
    logout(state) {
      state.accessToken = null;
      state.currentUser = null;
      state.isRequestInProgress = false;
    }
  },

  getters: {
    isRequestInProgress(state) {
      return state.isLogginIn;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getCurrentUserName(state) {
      return state.currentUser ? state.currentUser.name : '';
    },
    getAccessToken(state) {
      return state.accessToken;
    },
  }
}

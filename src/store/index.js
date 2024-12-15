import { createStore } from 'vuex';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default createStore({
  state: {
    token: null,
    user: null,
    userRole: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.userRole = null;
    }
  },
  actions: {
    async loginUser({ commit }, credentials) {
      const response = await axios.post('/api/login', credentials);
      const token = response.data.token;
      commit('setToken', token);
      const user = jwtDecode(token);
      commit('setUser', user);
      commit('setUserRole', user.role);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
    userRole: state => state.userRole
  }
});
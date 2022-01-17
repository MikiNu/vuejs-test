import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: localStorage.getItem('dataPayments') ? JSON.parse(localStorage.getItem('dataPayments')) : [],
    isLoading: false,
  }),

  getters: {
    isCached: (state) => state.data.length > 0,
  },

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('setState', { isLoading: true });

      try {
        const { data } = await api.getPayments(params);

        if (Array.isArray(data)) {
          localStorage.setItem('dataPayments', JSON.stringify(data));
          commit('setState', { data });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
    updateData({ commit, dispatch }) {
      localStorage.removeItem('dataPayments');
      commit('setState', { data: [] });
      dispatch('load');
    },
  },
});

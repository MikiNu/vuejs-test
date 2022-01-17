import axios from 'axios';
import mockPayments from '@/mocks/getPayments';

/**
 * @var {Axios}
 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

/**
 * Load payments data.
 *
 * @param {Object} params
 * @returns {Promise}
 */
const getPayments = (params = {}) => instance.request({
  method: 'get',
  url: '/api/v1/payments',
  params,
});

instance.interceptors.request.use((config) => {
  if (!process.env.VUE_APP_API_URL) {
    config.cancelToken = axios.CancelToken.source();
  }
  return config;
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (!process.env.VUE_APP_API_URL) {
    return mockPayments();
  }
  return error;
});

export default {
  instance,
  getPayments,
};

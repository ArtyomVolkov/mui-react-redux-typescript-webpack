import axios from 'axios';
import { REQUEST_TIMEOUT } from '@constants/commons';

const REST_API = window._env_.REST_API || '';

const defaultRequestConfig = {
  showError: true
};

const handleError = (error, message) => {
  if (error.config.showError) {
    // call error service
  }

  return Promise.reject({
    ...error,
    message
  });
};

const onSuccess = (response) => {
  if (response.config.showError && (response.data.errors)) {
    // call error service
  }
  return response;
}

const onError = (error) => {
  if (error.request.status === 401) {
    // log-out
    return Promise.reject({ ...error, canceled: true });
  }

  if (axios.isCancel(error)) {
    return handleError(error, 'Request has been canceled');
  }

  if (error.code === 'ECONNABORTED') {
    return handleError(error, 'Timeout error');
  }

  if (error.message) {
    return handleError(error, error.message);
  }

  if (error.request.status === 0) {
    return handleError(error, 'No internet connection');
  }

  if (!error.response) {
    return handleError(error, 'Internal error');
  }

  return Promise.reject({ ...error, canceled: true });
}

export const instance = axios.create({
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: 'Bearer ${auth-token}',
    }
  };
});

instance.interceptors.response.use(onSuccess, onError);

export default {
  post: (url, data = {}, config = null) => (
    instance.post(`${REST_API}${url}`, data, (config || defaultRequestConfig))
  ),
  get: (url, config = null) => (
    instance.get(`${REST_API}${url}`, (config || defaultRequestConfig))
  ),
  put: (url, data = {}, config = null) => (
    instance.put(`${REST_API}${url}`, data, (config || defaultRequestConfig))
  ),
  delete: (url, config = null) => (
    instance.delete(`${REST_API}${url}`, (config || defaultRequestConfig))
  ),
};

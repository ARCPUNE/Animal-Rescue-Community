import axios from 'axios';
import store from './Store/Store';
import { setTokens, clearTokens } from './Features/authSlice';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.jwtToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status is 401 and retry flag is not set
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        // Attempt to refresh the token
        const response = await axiosInstance.post('/refresh-token', { token: refreshToken });

        const { jwtToken, refreshToken: newRefreshToken } = response.data;

        // Store new tokens
        store.dispatch(setTokens(jwtToken, newRefreshToken));

        // Update the Authorization header and retry the original request
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${jwtToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearTokens()); // Clear tokens and maybe redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

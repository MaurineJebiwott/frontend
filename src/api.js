// src/api.js
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN, API_BASE_URL } from "./constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token if expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem(REFRESH_TOKEN)
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/api/token/refresh/`, {
          refresh: localStorage.getItem(REFRESH_TOKEN),
        });

        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          api.defaults.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error("Refresh token expired, redirecting to login...");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

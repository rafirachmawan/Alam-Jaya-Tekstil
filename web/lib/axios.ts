import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Interceptor untuk menyisipkan token secara otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

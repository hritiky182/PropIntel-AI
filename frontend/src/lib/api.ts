import axios from "axios";

// Single Axios instance — point baseURL at your MERN backend later.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("ukhp_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simulate network latency for mock services.
export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

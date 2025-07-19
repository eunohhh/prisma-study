import axios, { type AxiosError, type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "/",
});

// api.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.set('Authorization', `Bearer ${token}`);
//     }
//   }
//   return config;
// });

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export function formatDateToTZ(date: Date) {
  return date.toISOString().replace("T", " ").replace("Z", "+00");
}

export default api;

import { BASE_URL } from "@/consts/constants";
import axios, { AxiosError, AxiosResponse } from "axios";

const serverApi = axios.create({
  baseURL: BASE_URL,
});

serverApi.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default serverApi;

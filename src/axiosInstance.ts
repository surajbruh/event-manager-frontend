import axios, { type CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  timeout: 20000,
};

const axiosInstance = axios.create(options);
export { axiosInstance };

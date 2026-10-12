import axios, { type CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  timeout: 20000,
};

const axiosInstance = axios.create(options);
export { axiosInstance };

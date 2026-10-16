import { axiosInstance } from "../../axiosInstance";
import type { User } from "./AuthContext";

export type AuthPayload = {
  name?: string;
  email: string;
  password: string;
  role?: string;
};

export async function authenticateUser() {
  const res = await axiosInstance.get("/auth/me");
  return res.data.user as User;
}

export async function registerUser(payload: AuthPayload) {
  const res = await axiosInstance.post("/auth/register", payload);
  return res.data.user as User;
}

export async function loginUser(payload: AuthPayload) {
  const res = await axiosInstance.post("/auth/login", payload);
  return res.data.user as User;
}

export async function logoutUser() {
  await axiosInstance.post("/auth/logout");
  return;
}

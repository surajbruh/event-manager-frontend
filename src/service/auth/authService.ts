import { axiosInstance } from "../../axiosInstance";
import type { User } from "./AuthContext";

export async function authenticateUser() {
  const res = await axiosInstance.get("/auth/me");
  return res.data.user as User;
}

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return res.data.user as User;
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data.user as User;
}

export async function logoutUser() {
  await axiosInstance.post("/auth/logout");
  return;
}

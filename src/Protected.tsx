import { Navigate, Outlet } from "react-router";
import { useAuth } from "./auth/useAuth";

export default function Protected() {
  const { state: authState } = useAuth();
  if (authState.loading.auth) return <h1>authenticating....</h1>;
  return authState.user ? <Outlet /> : <Navigate to={"/"} />;
}

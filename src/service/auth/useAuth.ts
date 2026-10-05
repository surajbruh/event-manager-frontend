import { useContext } from "react";
import { ctx } from "./AuthContext";

function useAuth() {
  const authContext = useContext(ctx);
  if (!authContext) throw new Error("useAuth must be used inside AuthProvider");
  return authContext;
}

export { useAuth };

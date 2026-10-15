import { useContext } from "react";
import { ctx } from "./UserContext";

function useUser() {
  const userContext = useContext(ctx);
  if (!userContext) throw new Error("useUser must be used inside UserProvider");
  return userContext;
}

export { useUser };

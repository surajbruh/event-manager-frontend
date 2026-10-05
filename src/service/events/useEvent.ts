import { useContext } from "react";
import { EventCtx } from "./EventContext";

function useEvent() {
  const context = useContext(EventCtx);
  if (!context) throw new Error("useEvent must be used inside EventProvider");
  return context;
}
export { useEvent };

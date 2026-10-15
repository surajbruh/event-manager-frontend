import { createContext } from "react";
import type { Event } from "../events/EventContext";

interface Ticket {
  _id: string;
  user: string;
  event: Event;
  status: "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

interface UserState {
  registeredEvents: Ticket[];
  loading: {
    registeredEvents: boolean;
  };
}

type UserActionType =
  | { type: "SET EVENTS"; payload: Ticket[] }
  | { type: "FETCHING EVENTS"; payload: boolean };

const defaultValue = null;

const ctx = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserActionType>;
} | null>(defaultValue);

export { ctx, type Ticket, type UserState, type UserActionType };

import React, { createContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "organizer" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  // user = null if not authenticated, user = action.payload if authenticated
  user: User | null;
  loading: {
    auth: boolean;
    signIn: boolean;
    signOut: boolean;
  };
}

type ActionType =
  | {
      type: "SET_USER";
      payload: User | null;
    }
  | {
      type: "AUTH_CHECK_COMPLETE";
      payload: boolean;
    }
  | {
      type: "SIGNING_IN";
      payload: boolean;
    }
  | {
      type: "SIGNING_OUT";
      payload: boolean;
    };

const ctx = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<ActionType>;
} | null>(null);

export { ctx, type User, type AuthState, type ActionType };

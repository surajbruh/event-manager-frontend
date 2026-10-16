import { useEffect, useReducer } from "react";
import { ctx, type ActionType, type AuthState } from "./AuthContext";
import { authenticateUser } from "./authService";

const initialState: AuthState = {
  user: null,
  loading: {
    auth: true,
    signIn: false,
    signOut: false,
  },
};

function reducer(state: AuthState, action: ActionType): AuthState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "AUTHENTICATING":
      return {
        ...state,
        loading: {
          ...state.loading,
          auth: action.payload,
        },
      };

    case "SIGNING_IN":
      return {
        ...state,
        loading: {
          ...state.loading,
          signIn: action.payload,
        },
      };

    case "SIGNING_OUT":
      return {
        ...state,
        loading: {
          ...state.loading,
          signOut: action.payload,
        },
      };

    default:
      return state;
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    authenticateUser()
      .then((data) => dispatch({ type: "SET_USER", payload: data }))
      .catch((error) => console.error(error))
      .finally(() => dispatch({ type: "AUTHENTICATING", payload: false }));
  }, []);

  return <ctx.Provider value={{ state, dispatch }}>{children}</ctx.Provider>;
}

export { AuthProvider };

import { useEffect, useReducer } from "react";
import { ctx, type ActionType, type AuthState } from "./AuthContext";
import { axiosInstance } from "../../axiosInstance";

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

    case "AUTH_CHECK_COMPLETE":
      return {
        ...state,
        loading: {
          ...state.loading,
          auth: false,
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
    axiosInstance
      .get("/auth/me")
      .then((response) => {
        console.log(response);
        // set user
        dispatch({
          type: "SET_USER",
          payload: response.data.user,
        });
      })
      .catch(() => {})
      .finally(() => dispatch({ type: "AUTH_CHECK_COMPLETE", payload: true }));
  }, []);

  return <ctx.Provider value={{ state, dispatch }}>{children}</ctx.Provider>;
}

export { AuthProvider };

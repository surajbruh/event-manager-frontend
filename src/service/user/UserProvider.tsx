import { useEffect, useReducer } from "react";
import { ctx, type UserActionType, type UserState } from "./UserContext";
import { axiosInstance } from "../../axiosInstance";
import { useAuth } from "../auth/useAuth";

const initialState: UserState = {
  registeredEvents: [],
  loading: {
    registeredEvents: true,
  },
};

function reducer(state: UserState, action: UserActionType) {
  switch (action.type) {
    case "SET EVENTS":
      return {
        ...state,
        registeredEvents: action.payload,
      };

    case "FETCHING EVENTS":
      return {
        ...state,
        loading: {
          registeredEvents: action.payload,
        },
      };

    default:
      return state;
  }
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const { state: auth } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!auth.user) return;
    axiosInstance
      .get("/users/me/events")
      .then((response) => {
        dispatch({ type: "SET EVENTS", payload: response.data.tickets });
      })
      .finally(() => dispatch({ type: "FETCHING EVENTS", payload: false }));
  }, [auth.user]);

  useEffect(() => {
    console.log(state.registeredEvents);
  }, [state.registeredEvents]);

  if (state.loading.registeredEvents && auth.user)
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
        <p aria-live="polite">Fetching user details...</p>
      </main>
    );

  return <ctx.Provider value={{ state, dispatch }}>{children}</ctx.Provider>;
}

export { UserProvider };

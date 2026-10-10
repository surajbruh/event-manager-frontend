import { useEffect, useReducer } from "react";
import {
  EventCtx,
  type EventActionType,
  type EventState,
  type ParamsType,
} from "./EventContext";
import { axiosInstance } from "../../axiosInstance";
import { useSearchParams } from "react-router";

function reducer(state: EventState, action: EventActionType): EventState {
  switch (action.type) {
    case "FETCHING_EVENTS":
      return {
        ...state,
        loading: {
          ...state.loading,
          events: action.payload,
        },
      };

    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };

    case "SET_EVENT":
      return {
        ...state,
        selectedEvent: action.payload,
      };

    case "FETCHING_EVENT":
      return {
        ...state,
        loading: {
          ...state.loading,
          event: action.payload,
        },
      };

    default:
      return state;
  }
}

const initialState: EventState = {
  events: [],
  loading: {
    events: true, //true because EventProvider mounts before App
    event: false,
  },
  selectedEvent: null,
};

function EventProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  // const page = searchParams.get("page") || 1;

  useEffect(() => {
    // query params
    const querySearch = new URLSearchParams();
    if (q) querySearch.set("q", q);
    if (category) querySearch.set("category", category);

    // api request
    axiosInstance
      .get(`/events?${querySearch}`)
      .then((response) => {
        dispatch({
          type: "SET_EVENTS",
          payload: response.data.events,
        });
      })
      .catch(() => {})
      .finally(() => dispatch({ type: "FETCHING_EVENTS", payload: false }));
  }, [q, category]);

  function updateParams(param: ParamsType, value?: string): void {
    const n = new URLSearchParams(searchParams);

    if (value) n.set(param, value);
    else n.delete(param);

    setSearchParams(n);
  }

  return (
    <EventCtx.Provider
      value={{
        state,
        dispatch,
        updateParams,
      }}
    >
      {state.loading.events ? (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
          <p aria-live="polite">Fetching events...</p>
        </main>
      ) : (
        <>{children}</>
      )}
    </EventCtx.Provider>
  );
}

export { EventProvider };

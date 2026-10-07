import { useEffect, useReducer } from "react";
import {
  EventCtx,
  type EventActionType,
  type EventState,
} from "./EventContext";
import { axiosInstance } from "../../axiosInstance";

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

  useEffect(() => {
    axiosInstance
      .get("/events")
      .then((response) => {
        dispatch({
          type: "SET_EVENTS",
          payload: response.data.events,
        });
      })
      .catch(() => {})
      .finally(() => dispatch({ type: "FETCHING_EVENTS", payload: false }));
  }, []);

  return (
    <EventCtx.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EventCtx.Provider>
  );
}

export { EventProvider };

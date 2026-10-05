import React, { createContext } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  organizer: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EventState {
  events: Event[];
  loading: {
    events: boolean;
  };
}

type EventActionType =
  | {
      type: "FETCHING_EVENTS";
      payload: boolean;
    }
  | { type: "SET_EVENTS"; payload: Event[] };

interface EventContext {
  state: EventState;
  dispatch: React.Dispatch<EventActionType>;
}

const EventCtx = createContext<EventContext | null>(null);

export { EventCtx, type Event, type EventState, type EventActionType };

import React, { createContext } from "react";

interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  status: "active" | "cancelled";
  organizer: string;
  attendees: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface EventState {
  events: Event[];
  loading: {
    events: boolean;
    event: boolean;
  };
  selectedEvent: Event | null;
}

type EventActionType =
  | {
      type: "FETCHING_EVENTS";
      payload: boolean;
    }
  | { type: "SET_EVENTS"; payload: Event[] }
  | { type: "SET_EVENT"; payload: Event | null }
  | {
      type: "FETCHING_EVENT";
      payload: boolean;
    };

interface EventContext {
  state: EventState;
  dispatch: React.Dispatch<EventActionType>;
}

const EventCtx = createContext<EventContext | null>(null);

export { EventCtx, type Event, type EventState, type EventActionType };

import React, { createContext } from "react";

type EventCategory = "Tech" | "Music" | "Workshop" | "Community";
type EventStatus = "published" | "active" | "completed" | "cancelled";

interface Organizer {
  _id: string;
  name: string;
}

interface Event {
  _id: string;
  image: string;
  title: string;
  description: string;
  location: string;
  category: EventCategory;
  startDate: Date;
  endDate: Date;
  capacity: number;
  isFeatured: boolean;
  status: EventStatus;
  organizer: Organizer;
  registeredCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface EventState {
  events: Event[];
  loading: {
    events: boolean;
    event: boolean;
    featuredEvents: boolean;
  };
  selectedEvent: Event | null;
  featuredEvents: Event[];
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
    }
  | { type: "SET_FEATURED_EVENTS"; payload: Event[] }
  | {
      type: "FETCHING_FEATURED_EVENTS";
      payload: boolean;
    };

type ParamsType = "q" | "category";

interface EventContext {
  state: EventState;
  dispatch: React.Dispatch<EventActionType>;
  searchParams: URLSearchParams;
  updateParams: (param: ParamsType, value?: string) => void; // it's helps set URL query params.
}

const EventCtx = createContext<EventContext | null>(null);

export {
  EventCtx,
  type Event,
  type EventState,
  type EventActionType,
  type ParamsType,
};

import { axiosInstance } from "../../axiosInstance";
import type { Event } from "./EventContext";

export async function fetchEvents(queryParams: URLSearchParams) {
  console.log(queryParams);
  const res = await axiosInstance.get(`/events/?${queryParams}`);
  return res.data.events as Event[];
}

export async function fetchEventById(id: string) {
  const res = await axiosInstance.get(`/events/${id}`);
  return res.data.event as Event;
}

export async function createEvent(data: FormData) {
  const res = await axiosInstance.post("/events", data);
  return res.data.event as Event;
}

export async function updateEvent(id: string, data: FormData) {
  const res = await axiosInstance.patch(`/events/${id}`, data);
  return res.data.event as Event;
}

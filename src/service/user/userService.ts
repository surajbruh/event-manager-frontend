import { axiosInstance } from "../../axiosInstance";
import type { Ticket } from "./UserContext";

export async function registerUserForEvent(id: string) {
  const res = await axiosInstance.post(`/events/${id}/register`);
  return res.data.ticket as Ticket;
}

export async function cancelUserTicket(id: string) {
  await axiosInstance.delete(`/events/${id}/ register`);
  return;
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../axiosInstance";
import { useEvent } from "../service/events/useEvent";
import { useAuth } from "../service/auth/useAuth";

export default function EventPage() {
  const { id } = useParams();

  const { state: authState } = useAuth();
  const { state: eventState, dispatch } = useEvent();

  const [booking, setBooking] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const nav = useNavigate();

  async function handleClick() {
    try {
      if (!authState.user) return nav("/");
      setBooking(true);
      const response = await axiosInstance.patch(`/events/${id}/register`);

      dispatch({
        type: "SET_EVENT",
        payload: response.data.event,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setBooking(false);
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true);
      const response = await axiosInstance.delete(`/events/${id}`);
      if (response.status === 200) {
        dispatch({
          type: "SET_EVENTS",
          payload: eventState.events.filter((event) => event._id !== id),
        });

        dispatch({
          type: "SET_EVENT",
          payload: null,
        });

        nav("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    dispatch({ type: "FETCHING_EVENT", payload: true });
    axiosInstance
      .get(`/events/${id}`)
      .then((response) =>
        dispatch({ type: "SET_EVENT", payload: response.data.event }),
      )
      .finally(() => dispatch({ type: "FETCHING_EVENT", payload: false }));
  }, [id, dispatch]);

  if (eventState.loading.event) return <h1>fetching event...</h1>;
  if (!eventState.selectedEvent) return null;

  return (
    <>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "10px",
        }}
      >
        {JSON.stringify(eventState.selectedEvent, null, 2)}
      </pre>

      <h1 className="uppercase">book tickets</h1>
      <button
        onClick={handleClick}
        disabled={
          eventState.selectedEvent.attendees.some(
            (attendeeId) => attendeeId === authState.user?.id,
          ) || booking
        }
        className="px-4 py-1 border-black border bg-green-500 text-white uppercase"
      >
        {/* if !user = login txt
          if selected.attendees include user.id then booked txt
          if booking loading state = true then booking txt
        */}
        {authState.user
          ? eventState.selectedEvent.attendees.some(
              (attendeeId) => attendeeId === authState.user?.id,
            )
            ? "booked"
            : booking
              ? "booking..."
              : "bookTicket"
          : "login"}
      </button>

      {(authState.user?.role === "admin" ||
        eventState.selectedEvent.organizer === authState.user?.id) && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-1 border-black border bg-red-500 text-white uppercase"
        >
          {deleting ? "deleting..." : "delete event"}
        </button>
      )}
    </>
  );
}

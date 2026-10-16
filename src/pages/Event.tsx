import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../axiosInstance";
import { useEvent } from "../service/events/useEvent";
import { useAuth } from "../service/auth/useAuth";
import { formatEventDate } from "../config/formatDate";
import { useUser } from "../service/user/useUser";
import { fetchEventById } from "../service/events/eventService";

export default function Event() {
  const { id } = useParams();

  const { state: auth } = useAuth();
  const { state: eventState, dispatch } = useEvent();
  const { state: userDetials } = useUser();

  const [registering, setRegistering] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  // Fetch event
  useEffect(() => {
    dispatch({ type: "FETCHING_EVENT", payload: true });

    if (!id) return;

    fetchEventById(id)
      .then((data) => dispatch({ type: "SET_EVENT", payload: data }))
      .catch(() => {})
      .finally(() => dispatch({ type: "FETCHING_EVENT", payload: false }));
  }, [id, dispatch]);

  // loading state
  if (eventState.loading.event) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
        <p aria-live="polite">Fetching event...</p>
      </main>
    );
  }

  if (!eventState.selectedEvent) return null;

  const event = eventState.selectedEvent;

  const spotsLeft = event.capacity - event.registeredCount;
  const isRegistered = auth.user
    ? userDetials.registeredEvents.some(
        (ticket) => ticket.event._id === event._id,
      )
    : false;

  async function handleRegistration() {
    if (!auth.user) {
      navigate("/auth/login");
      return;
    }

    try {
      setRegistering(true);

      const response = await axiosInstance.post(`/events/${id}/register`);

      dispatch({
        type: "SET_EVENT",
        payload: response.data.event,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setRegistering(false);
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true);
      await axiosInstance.delete(`/events/${id}`);
      // update current selected event state
      dispatch({
        type: "SET_EVENT",
        payload: null,
      });

      // update events state
      dispatch({
        type: "SET_EVENTS",
        payload: [...eventState.events.filter((ev) => ev._id !== id)],
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  }

  function handleNav() {
    dispatch({ type: "SET_EVENT", payload: null });
    navigate(`/events/${id}/edit`);
    return;
  }

  return (
    <main>
      <article className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 md:px-8 md:py-12">
        {/* Event information */}
        <header className="mb-8 sm:mb-10">
          <p className="mb-2 text-sm capitalize text-gray-600">
            Hosted by {event.organizer.name}
          </p>

          <h1 className="mb-2 text-4xl font-bold uppercase leading-tight sm:text-5xl md:text-[52px]">
            {event.title}
          </h1>

          <address className="not-italic">
            <p className="capitalize">{event.location}</p>

            <time
              dateTime={event.startDate.toString()}
              className="capitalize text-gray-600"
            >
              {formatEventDate(event.startDate.toString()).compact}
            </time>
          </address>
        </header>

        {/* Event image */}
        <figure className="mb-8 w-full overflow-hidden rounded-md bg-amber-100">
          <img
            src={event.image || "/image.jpg"}
            alt={`${event.title} event`}
            loading="lazy"
            className="mx-auto aspect-video w-full object-cover object-center"
          />
        </figure>

        {/* Event details */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_1fr] lg:gap-12">
          <section aria-labelledby="description-heading">
            <h2 id="description-heading" className="mb-3 text-2xl font-bold">
              About this event
            </h2>

            <p className="leading-relaxed">{event.description}</p>
          </section>

          {/* Registration */}
          <aside
            aria-labelledby="registration-heading"
            className="h-fit space-y-3 bg-gray-100 p-4 sm:p-5"
          >
            <h2 id="registration-heading" className="font-semibold">
              Registration
            </h2>

            <p>
              {spotsLeft} of {event.capacity} spots left
            </p>

            <button
              type="button"
              disabled={registering || isRegistered}
              onClick={handleRegistration}
              className="w-full rounded-xl bg-black px-4 py-3 text-white hover:underline disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
            >
              {!auth.user
                ? "Login"
                : registering
                  ? "..."
                  : isRegistered
                    ? "Already registered"
                    : "Reserve your spot"}
            </button>
          </aside>
        </div>

        {/* Event controls */}
        {auth.user &&
          (auth.user.role === "admin" ||
            event.organizer._id === auth.user.id) && (
            <section
              aria-label="Event management"
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <button
                type="button"
                className="w-full rounded-xl border px-4 py-2 hover:underline sm:w-fit sm:px-5"
              >
                Cancel event
              </button>

              <button
                type="button"
                onClick={handleNav}
                className="w-full rounded-xl border px-4 py-2 hover:underline sm:w-fit sm:px-5"
              >
                Edit event
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="w-full rounded-xl border border-black px-4 py-2 text-red-500 hover:border-red-500 hover:underline sm:w-fit sm:px-5"
              >
                {deleting ? "..." : "Delete"}
              </button>
            </section>
          )}
      </article>
    </main>
  );
}

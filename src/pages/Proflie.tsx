import { useNavigate, Link } from "react-router";
import { useAuth } from "../service/auth/useAuth";
import { useEvent } from "../service/events/useEvent";
import { formatEventDate } from "../config/formatDate";
import { useUser } from "../service/user/useUser";
import { logoutUser } from "../service/auth/authService";

// imporve events filtering, maybe update db, schema to allow n to n relationship
// add server caching

export default function Profile() {
  const { state: auth, dispatch } = useAuth();
  const { state: eventState } = useEvent();
  const { state: userDetials } = useUser();

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      dispatch({ type: "SIGNING_OUT", payload: true });

      await logoutUser();

      dispatch({ type: "SET_USER", payload: null });
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "SIGNING_OUT", payload: false });
    }
  }

  const eventsHosted = eventState.events.filter(
    (event) => event.organizer._id === auth.user!.id,
  );

  const tickets = userDetials.registeredEvents;

  return (
    <main>
      <section
        aria-labelledby="profile-heading"
        className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 md:px-8 md:py-12"
      >
        {/* Profile */}
        <header className="mb-8 sm:mb-10">
          <p className="capitalize text-gray-600">{auth.user?.role}</p>

          <h1
            id="profile-heading"
            className="mb-2 text-4xl font-bold uppercase leading-tight sm:text-5xl md:text-[52px]"
          >
            {auth.user?.name}
          </h1>

          <p className="text-gray-600">{auth.user?.email}</p>

          <button
            type="button"
            onClick={handleLogout}
            disabled={auth.loading.signOut}
            className="mt-5 bg-black px-4 py-3 text-sm uppercase text-white hover:underline disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          >
            {auth.loading.signOut ? "Logging out..." : "Logout"}
          </button>
        </header>

        {/* Hosted Events */}
        <section
          aria-labelledby="hosted-events-heading"
          className="mb-8 sm:mb-10"
        >
          <h2
            id="hosted-events-heading"
            className="mb-3 text-2xl font-bold leading-tight sm:text-3xl"
          >
            Events I'm hosting
          </h2>

          {eventsHosted.length === 0 ? (
            <p className="text-gray-600">No events hosted yet.</p>
          ) : (
            <ul className="space-y-3">
              {eventsHosted.map((event) => (
                <li key={event._id}>
                  <Link
                    to={`/events/${event._id}`}
                    className="flex flex-col gap-2 bg-gray-100 p-3 transition hover:bg-gray-200 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium">{event.title}</span>

                    <time
                      dateTime={event.startDate.toString()}
                      className="text-sm text-gray-500 sm:text-right"
                    >
                      {formatEventDate(event.startDate.toString()).compact}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Attending Events */}
        <section aria-labelledby="attending-events-heading">
          <h2
            id="attending-events-heading"
            className="mb-3 text-2xl font-bold leading-tight sm:text-3xl"
          >
            Events I'm attending
          </h2>

          {tickets.length === 0 ? (
            <p className="text-gray-600">No RSVP yet.</p>
          ) : (
            <ul className="space-y-3">
              {tickets.map((ticket) => (
                <li key={ticket._id}>
                  <Link
                    to={`/events/${ticket.event._id}`}
                    className="flex flex-col gap-2 bg-gray-100 p-3 transition hover:bg-gray-200 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium">{ticket.event.title}</span>

                    <time
                      dateTime={ticket.event.startDate.toString()}
                      className="text-sm text-gray-500 sm:text-right"
                    >
                      {
                        formatEventDate(ticket.event.startDate.toString())
                          .compact
                      }
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}

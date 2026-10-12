import type React from "react";
import Slides from "../components/Slides";
import { categories } from "../config/data.json";
import { formatEventDate } from "../config/formatDate";
import { Link } from "react-router";
import { useEvent } from "../service/events/useEvent";

export default function Home() {
  const { state, updateParams } = useEvent();

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = new FormData(e.target).get("q") || "";
    updateParams("q", value as string);
  }

  return (
    <main>
      <Slides />

      <section
        aria-labelledby="events-heading"
        className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 md:px-8 md:py-12"
      >
        <header className="mb-5 sm:mb-8">
          <h1
            id="events-heading"
            className="mb-3 text-4xl font-bold uppercase leading-tight sm:text-5xl md:text-[52px]"
          >
            Find something to show up for.
          </h1>

          <form
            className="flex w-full max-w-2xl gap-2 sm:gap-3"
            onSubmit={handleFormSubmit}
            role="search"
          >
            <label htmlFor="event-search" className="sr-only">
              Search events
            </label>

            <input
              id="event-search"
              name="q"
              placeholder="Search by title or place"
              className="mt-1 min-w-0 flex-1 rounded-xl border border-(--mist) bg-white px-4 py-[0.6rem]"
            />

            <button
              type="submit"
              className="shrink-0 rounded-xl bg-black px-4 py-1 text-white hover:underline sm:px-5"
            >
              Search
            </button>
          </form>
        </header>

        {/* Categories */}
        <nav aria-label="Event categories" className="mb-5 sm:mb-8 md:mb-12">
          <ul className="flex gap-4 overflow-x-auto pb-1 sm:gap-5">
            {["", ...categories].map((category) => (
              <li key={category} className="shrink-0">
                <button
                  type="button"
                  className="underline hover:font-semibold"
                  onClick={() => updateParams("category", category)}
                >
                  {category || "All"}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Events */}
        <section aria-labelledby="events-list-heading">
          <h2 id="events-list-heading" className="sr-only">
            Upcoming events
          </h2>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {state.events.map((event) => (
              <li
                key={event._id}
                className="rounded-lg p-2 transition hover:bg-black/10 hover:shadow"
              >
                <Link to={`/events/${event._id}`} className="block space-y-1">
                  <figure className="mb-4 aspect-video w-full overflow-hidden rounded-md">
                    <img
                      src={event.image || "/image.jpg"}
                      alt={event.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  </figure>

                  <p className="text-xs text-green-500">
                    {event.capacity - event.attendees.length} spots left
                  </p>

                  <div className="leading-tight">
                    <p className="overflow-hidden text-ellipsis text-nowrap text-sm">
                      {event.location}
                    </p>

                    <h3 className="font-semibold capitalize">{event.title}</h3>

                    <time
                      dateTime={event.startDate.toString()}
                      className="text-sm uppercase"
                    >
                      {formatEventDate(event.startDate.toString()).compact}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

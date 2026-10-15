import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { useNavigate, useParams } from "react-router";
import type { Event } from "../service/events/EventContext";
import { useEvent } from "../service/events/useEvent";
import { categories } from "../config/data.json";

export default function EventForm() {
  const { id } = useParams();

  const [eventData, setEventData] = useState<Event | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // const [eventCreated, setEventCreated] = useState(false);
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();

  const { state, dispatch } = useEvent();

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    console.log(formData);

    try {
      const response = await axiosInstance.post("/events", formData);
      dispatch({
        type: "SET_EVENTS",
        payload: [...state.events, response.data.event],
      });

      alert("Event created successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    console.log(id);
    if (!id) return;
    axiosInstance
      .get(`/events/${id}`)
      .then((response) => setEventData(response.data.event))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching && id) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
        <p aria-live="polite">Fetching event details...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">
            {id ? "Edit event" : "Create an event"}
          </h1>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Fill in the details below to publish your event.
          </p>
        </header>

        <form
          onSubmit={submit}
          className="rounded-xl bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                Title
              </label>

              <input
                id="title"
                name="title"
                required
                minLength={3}
                defaultValue={eventData?.title}
                placeholder="Enter event title"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                required
                minLength={10}
                rows={5}
                defaultValue={eventData?.description}
                placeholder="Describe your event..."
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Categories */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium"
              >
                Category
              </label>

              <select
                name="category"
                id="category"
                defaultValue={eventData?.category || ""}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              >
                <option value="" disabled hidden>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label
                htmlFor="capacity"
                className="mb-2 block text-sm font-medium"
              >
                Capacity
              </label>

              <input
                id="capacity"
                name="capacity"
                type="number"
                min={1}
                required
                defaultValue={eventData?.capacity}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Dates */}
            <fieldset>
              <legend className="mb-3 text-sm font-medium">
                Event schedule
              </legend>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="startDate"
                    className="mb-2 block text-sm text-gray-600"
                  >
                    Start date
                  </label>

                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    required
                    // defaultValue={}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="mb-2 block text-sm text-gray-600"
                  >
                    End date
                  </label>

                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    required
                    // defaultValue={}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </fieldset>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                required
                defaultValue={eventData?.location}
                placeholder="Enter event location"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Image */}
            <div>
              <label htmlFor="image" className="mb-2 block text-sm font-medium">
                Event image
              </label>

              <input
                id="image"
                name="image"
                required
                type="file"
                accept="image/*"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm file:mr-4 file:border-0 file:bg-black file:px-4 file:py-3 file:text-white hover:file:bg-gray-800"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-black px-5 py-3 font-medium uppercase text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Creating event..." : "Create event"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

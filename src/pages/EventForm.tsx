import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEvent } from "../service/events/useEvent";
import { categories } from "../config/data.json";
import { fetchEventById, updateEvent } from "../service/events/eventService";
import NotFound from "./NotFound";

export default function EventForm() {
  const { id } = useParams();
  const { state, dispatch } = useEvent();

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!id || submitting) return;

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const data = await updateEvent(id, formData);
      dispatch({ type: "SET_EVENTS", payload: [...state.events, data] });
      alert("Event created successfully");
      // clearing the state cuz we are navigating away
      dispatch({ type: "SET_EVENT", payload: null });
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    dispatch({ type: "FETCHING_EVENT", payload: true });
    fetchEventById(id)
      .then((data) => dispatch({ type: "SET_EVENT", payload: data }))
      .catch((error) => console.error(error))
      .finally(() => dispatch({ type: "FETCHING_EVENT", payload: false }));
  }, [dispatch, id]);

  if (state.loading.event && id) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
        <p aria-live="polite">Fetching event details...</p>
      </main>
    );
  }

  if (!state.selectedEvent) return <NotFound />;

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
                defaultValue={state.selectedEvent?.title}
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
                defaultValue={state.selectedEvent?.description}
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
                defaultValue={state.selectedEvent?.category || ""}
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
                defaultValue={state.selectedEvent?.capacity}
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
                defaultValue={state.selectedEvent?.location}
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

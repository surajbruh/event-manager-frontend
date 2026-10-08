import { useState } from "react";
import { axiosInstance } from "../axiosInstance";

const data = {
  title: "Mumbai Tech Meetup 2026",
  description:
    "A community meetup for developers, engineers, and tech enthusiasts to discuss modern web development, AI, and emerging technologies.",
  location: "WeWork, BKC, Mumbai",
  startDate: "2026-10-15T10:00:00+05:30",
  endDate: "2026-10-15T16:00:00+05:30",
  capacity: 150,
};

export default function EventForm() {
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    const body = Object.fromEntries(new FormData(e.target));
    console.log(body);
    // body.date = new Date(body.date as string).toISOString();

    try {
      await axiosInstance.post("/events", body);
      alert("event created successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <form className="wide" onSubmit={submit}>
      {/* <Errors err={err} /> */}
      <label>
        Title
        {/* <input name="title" required minLength={3} defaultValue={ev?.title} /> */}
        <input name="title" required minLength={3} defaultValue={data.title} />
      </label>
      <label>
        Description
        <textarea
          name="description"
          required
          minLength={10}
          rows={4}
          //   defaultValue={ev?.description}
          defaultValue={data.description}
        />
      </label>
      {/* <label>
        Category
        <select name="category" defaultValue={ev?.category}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label> */}
      <label>
        Capacity
        <input
          name="capacity"
          type="number"
          min={1}
          //   defaultValue={ev?.capacity ?? 50}
          defaultValue={data.capacity}
        />
      </label>
      <label>
        Start Date
        <input
          name="startDate"
          type="date"
          //   type="datetime-local"
          required
          //   defaultValue={ev ? toLocalInput(ev.date) : ""}
          defaultValue={data.startDate}
        />
      </label>
      <label>
        Date and time
        <input
          name="endDate"
          type="date"
          //   type="datetime-local"
          required
          //   defaultValue={ev ? toLocalInput(ev.date) : ""}
          defaultValue={data.startDate}
        />
      </label>
      <label>
        Location
        {/* <input name="location" required defaultValue={ev?.location} /> */}
        <input name="location" required defaultValue={data.location} />
      </label>
      {/* <button>{id ? "Save changes" : "Publish event"}</button> */}
      <button disabled={submitting}>
        {submitting ? "creating event..." : "create event"}
      </button>
    </form>
  );
}

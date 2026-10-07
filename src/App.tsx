import { useEffect } from "react";
import { useAuth } from "./service/auth/useAuth";
import { useEvent } from "./service/events/useEvent";
import { Link } from "react-router";

export default function App() {
  const { state } = useAuth();
  const { state: eventState } = useEvent();

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log(eventState);
  }, [eventState]);

  if (state.loading.auth) return <h1>Loading...</h1>;

  return (
    <>
      <div>
        {eventState.loading.events ? (
          <p>fetching events...</p>
        ) : (
          <div>
            {eventState.events.length === 0 ? (
              <h1>no events</h1>
            ) : (
              <ul>
                {eventState.events.map((event) => (
                  <Link
                    key={event._id}
                    to={`events/${event._id}`}
                    className="mb-4"
                  >
                    <pre
                      style={{
                        background: "#f4f4f4",
                        padding: "10px",
                      }}
                    >
                      {JSON.stringify(event, null, 2)}
                    </pre>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}

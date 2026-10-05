import { useEffect } from "react";
import { useAuth } from "./service/auth/useAuth";
import { useEvent } from "./service/events/useEvent";

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
            {/* The arguments (null, 2) add 2 spaces of indentation */}
            <pre style={{ background: "#f4f4f4", padding: "10px" }}>
              {JSON.stringify(eventState.events, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}

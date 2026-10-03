import { useEffect } from "react";
import { useAuth } from "./auth/useAuth";
import { axiosInstance } from "./axiosInstance";
import { useEvent } from "./events/useEvent";

export default function App() {
  const { state, dispatch } = useAuth();
  const { state: eventState } = useEvent();

  async function handleLogin() {
    try {
      dispatch({
        type: "SIGNING_IN",
        payload: true,
      });

      const data = {
        email: "adityachauhan044@gmail.com",
        password: "surajyadav123",
      };
      const response = await axiosInstance.post("/auth/login", data);

      dispatch({
        type: "SET_USER",
        payload: response.data.user,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "SIGNING_IN",
        payload: false,
      });
    }
  }

  async function handleLogout() {
    try {
      dispatch({
        type: "SIGNING_OUT",
        payload: true,
      });

      const response = await axiosInstance.post("/auth/logout");
      console.log(response);

      dispatch({
        type: "SET_USER",
        payload: null,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({
        type: "SIGNING_OUT",
        payload: false,
      });
    }
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log(eventState);
  }, [eventState]);

  if (state.loading.auth) return <h1>Loading...</h1>;

  return (
    <>
      {state.user ? (
        <div>
          {/* The arguments (null, 2) add 2 spaces of indentation */}
          <pre style={{ background: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(state.user, null, 2)}
          </pre>
        </div>
      ) : (
        "not authenticated"
      )}

      <h1>my react app</h1>
      {state.user ? (
        <button onClick={handleLogout} disabled={state.loading.signOut}>
          {state.loading.signOut ? "signing out..." : "logout"}
        </button>
      ) : (
        <button onClick={handleLogin} disabled={state.loading.signIn}>
          {state.loading.signIn ? "signing in..." : "login"}
        </button>
      )}

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

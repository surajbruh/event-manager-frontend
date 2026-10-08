import { useNavigate } from "react-router";
import { axiosInstance } from "../axiosInstance";
import { useAuth } from "../service/auth/useAuth";

export default function Profile() {
  const { state: auth, dispatch } = useAuth();
  const nav = useNavigate();

  async function handleLogout() {
    dispatch({ type: "SIGNING_OUT", payload: true });
    await axiosInstance
      .post("/auth/logout")
      .then(() => {
        dispatch({ type: "SET_USER", payload: null });
        nav("/");
      })
      .catch(() => {})
      .finally(() => dispatch({ type: "SIGNING_OUT", payload: false }));
  }

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 md:px-8 md:py-12">
        <pre
          style={{
            background: "#f4f4f4",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          {JSON.stringify(auth.user, null, 2)}
        </pre>
        <button
          onClick={handleLogout}
          disabled={auth.loading.signOut}
          className="bg-black px-3 py-3 text-sm uppercase text-white hover:underline sm:text-base md:text-lg"
        >
          {auth.loading.signOut ? "..." : "Logout"}
        </button>
      </section>
    </main>
  );
}

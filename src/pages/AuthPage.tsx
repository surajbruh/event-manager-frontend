import { useNavigate } from "react-router";
import { useAuth } from "../service/auth/useAuth";
import { registerUser, loginUser } from "../service/auth/authService";

const registerPayload = {
  name: "suraj",
  email: "imsurajyadav088@gmail.com",
  password: "password",
};

const loginPayload = {
  email: "admin@event.com",
  password: "password123",
};

export default function AuthPage({ mode }: { mode: "LOGIN" | "REGISTER" }) {
  const { state: auth, dispatch } = useAuth();
  const nav = useNavigate();

  async function handleAuth() {
    try {
      dispatch({ type: "AUTHENTICATING", payload: true });

      const data =
        mode === "REGISTER"
          ? await registerUser(registerPayload)
          : await loginUser(loginPayload);

      dispatch({ type: "SET_USER", payload: data });

      nav("/");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "AUTHENTICATING", payload: false });
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
      <button
        disabled={auth.loading.auth}
        onClick={handleAuth}
        className="w-fit bg-black px-3 py-3 text-sm uppercase text-white hover:underline sm:text-base md:text-lg"
      >
        {auth.loading.auth ? "auth..." : mode}
      </button>
    </main>
  );
}
